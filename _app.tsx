import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ErrorBoundary from '../components/ErrorBoundary';
// import Layout from '../components/Layout';
const Layout = dynamic(() => import('../components/Layout'));
const ProtectedRoute = dynamic(() => import('../routes/ProtectedRoute'));
// import ProtectedRoute from '../routes/ProtectedRoute';
import { CONSTANTS } from '../services/config/app-config';
import { persistor, store } from '../store/store';

// import 'bootstrap/dist/css/bootstrap-grid.min.css';
// import 'bootstrap/dist/css/bootstrap-utilities.min.css';
// import 'bootstrap/dist/css/bootstrap-reboot.min.css';

// Will be deprecated in the future and above modules would be used
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ErrorBoundary>
            <Layout>
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
