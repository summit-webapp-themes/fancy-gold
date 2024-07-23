import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-bootstrap';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ErrorBoundary from '../components/ErrorBoundary';
import Layout from '../components/Layout';
import ProtectedRoute from '../routes/ProtectedRoute';
import { CONSTANTS } from '../services/config/app-config';
import { persistor, store } from '../store/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ErrorBoundary>
            <Layout>
              {/* <ToastContainer position="top-right" autoClose={8000} hideProgressBar={false} newestOnTop={false} draggable={false} closeOnClick pauseOnHover /> */}
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
