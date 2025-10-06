import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from './Navbar/Navbar';
import useInactivityLogout from '../hooks/GeneralHooks/useInactivityLogout';
import { emitSocketEvent } from '../utils/http-methods';

const Layout = ({ children }: any) => {
  useInactivityLogout();
  const router = useRouter();
  const toShowHeader =
    router.pathname === '/login' || router.pathname === '/register' || router.pathname === '/forgot_password' ? false : true;
  const toShowFooter =
    router.pathname === '/login' || router.pathname === '/register' || router.pathname === '/forgot_password' ? false : true;

  // This effect tracks route changes
  useEffect(() => {
    const handleRouteChangeStart = () => {
      // 1. Get the current page data from sessionStorage (before changing!)
      const retrieveSessionStorage = sessionStorage.getItem('summit_page_data');
      if (retrieveSessionStorage) {
        const prevPage = JSON.parse(retrieveSessionStorage);
        // 2. Get user info from localStorage
        const user_name = localStorage.getItem('party_name') || '';
        const phone = localStorage.getItem('phone') || '';
        const email_id = localStorage.getItem('user') || '';
        if (user_name) {
          // 3. Emit "Disconnect" for previous page
          emitSocketEvent({
            user_data: { name: user_name, phone, emailID: email_id },
            page_type: prevPage.page_type,
            page_id: prevPage.page_id,
            reference_type: prevPage.reference_type,
            reference_id: prevPage.reference_id,
            action: 'Disconnect',
            is_active: false,
          });
        }
      }
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
    };
  }, [router.events]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      // Always re-read the latest socket_data
      const retrieveSessionStorage = sessionStorage.getItem('summit_page_data');
      const { reference_type, reference_id, page_type, page_id } = JSON.parse(retrieveSessionStorage);
      if (!retrieveSessionStorage) return;

      const user_name = localStorage.getItem('party_name') || '';
      const phone = localStorage.getItem('phone') || '';
      const email_id = localStorage.getItem('user') || '';

      if (!user_name) return;

      // Prepare action based on visibility
      const action = document.visibilityState === 'hidden' ? 'Disconnect' : 'Page View';
      const is_active = document.visibilityState === 'hidden' ? false : true;

      // Prepare analytics payload
      const userAnalyticsPayload = {
        user_data: { name: user_name, phone, emailID: email_id },
        page_type,
        page_id,
        reference_type,
        reference_id,
        action,
        is_active,
      };

      emitSocketEvent(userAnalyticsPayload);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <>
      {toShowHeader && <Navbar />}
      {children}
    </>
  );
};

export default Layout;
