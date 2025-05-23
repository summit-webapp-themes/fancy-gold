import { useRouter } from 'next/router';
import Navbar from './Navbar/Navbar';
import { useSelector } from 'react-redux';
import { get_access_token, getAccessToken } from '../store/slices/auth/token-login-slice';

const Layout = ({ children }: any) => {
   const tokenFromStore: any = useSelector(get_access_token);
  const router = useRouter();
  const toShowHeader =
    router.pathname === '/login' || router.pathname === '/register' || router.pathname === '/forgot_password' ? false : true;
  const toShowFooter =
    router.pathname === '/login' || router.pathname === '/register' || router.pathname === '/forgot_password' ? false : true;

  return (
    <>
      {toShowHeader && tokenFromStore.token &&  <Navbar />}
      {children}
    </>
  );
};
export default Layout;
