import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import ErrorBoundary from '../components/ErrorBoundary';
// import Layout from '../components/Layout';
const Layout = dynamic(() => import('../components/Layout'));
const ProtectedRoute = dynamic(() => import('../routes/ProtectedRoute'));
// import ProtectedRoute from '../routes/ProtectedRoute';
import { CONSTANTS } from '../services/config/app-config';
import { persistor, store } from '../store/store';
import { useHandleClientInteractivity } from '../hooks/SocketHooks/useHandleClientInteractivity';

// import 'bootstrap/dist/css/bootstrap-grid.min.css';
// import 'bootstrap/dist/css/bootstrap-utilities.min.css';
// import 'bootstrap/dist/css/bootstrap-reboot.min.css';

// Will be deprecated in the future and above modules would be used
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  const { handleVisibilityChange } = useHandleClientInteractivity();

  useEffect(() => {
    function handleClientVisibility() {
      const visibilityState = document.visibilityState;
      handleVisibilityChange(visibilityState);
    }

    document.addEventListener('visibilitychange', handleClientVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleClientVisibility);
    };
  }, []);
  return (
    <div>
      <Head>
        <title>ARC Digital Catalog</title>
        <link rel="icon" href="/assets/images/logo.png" />
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ErrorBoundary>
            <Layout>
              <ToastContainer
                position="top-right"
                className="toast-container-below-navbar"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                draggable={false}
                closeOnClick
                pauseOnHover
              />
              {/* Below condition is to check whether give complete access of site to guest user or user can access site only after authentication */}
              {CONSTANTS.ALLOW_GUEST_TO_ACCESS_SITE_EVEN_WITHOUT_AUTHENTICATION ? (
                <Component {...pageProps} />
              ) : (
                <ProtectedRoute>
                  <Component {...pageProps} />
                </ProtectedRoute>
              )}
            </Layout>
          </ErrorBoundary>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default MyApp;
