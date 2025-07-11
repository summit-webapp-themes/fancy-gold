import { useRouter } from 'next/router';
import Navbar from './Navbar/Navbar';
import useInactivityLogout from '../hooks/GeneralHooks/useInactivityLogout';

const Layout = ({ children }: any) => {
  const router = useRouter();

  useInactivityLogout();

  const toShowHeader =
    router.pathname === '/login' || router.pathname === '/register' || router.pathname === '/forgot_password' ? false : true;
  const toShowFooter =
    router.pathname === '/login' || router.pathname === '/register' || router.pathname === '/forgot_password' ? false : true;

  return (
    <>
      {toShowHeader && <Navbar />}
      {children}
    </>
  );
};
export default Layout;
