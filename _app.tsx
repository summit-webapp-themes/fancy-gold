import { Dispatch } from '@reduxjs/toolkit';
import type { AppProps } from 'next/app';
import App from 'next/app';
import { ToastContainer } from 'react-bootstrap';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Layout from '../components/Layout';
import { getMultiCurrencyValue } from '../services/api/general_apis/default-currency-api';
import MultiLangApi from '../services/api/general_apis/multilanguage-api';
import { setDefaultCurrencyValue } from '../store/slices/general_slices/multi-currency-slice';
import { setMultiLingualData } from '../store/slices/general_slices/multilang-slice';
import { persistor, store } from '../store/store';
import '../styles/globals.scss';

const initializeStore = (dispatch: Dispatch, fetchedDataFromServer: any) => {
  const getCurrentTimestamp = Date.now();
  dispatch(setDefaultCurrencyValue(fetchedDataFromServer?.defaultCurrencyValue));
  dispatch(setMultiLingualData(fetchedDataFromServer?.multiLingualValues));
};

function MyApp({ Component, pageProps, fetchedDataFromServer }: AppProps & { fetchedDataFromServer: any }) {
  initializeStore(store.dispatch, fetchedDataFromServer);
  return (
    <div>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Layout>
            <ToastContainer
              position="top-right"
              autoClose={8000}
              hideProgressBar={false}
              newestOnTop={false}
              draggable={false}
              closeOnClick
              pauseOnHover
            />
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      </Provider>
    </div>
  );
}
MyApp.getInitialProps = async (appContext: any) => {
  const appProps = await App.getInitialProps(appContext);

  let fetchedDataFromServer: any = {};

  let get_default_currency_value: any = await getMultiCurrencyValue();
  if (get_default_currency_value?.status === 200) {
    fetchedDataFromServer.defaultCurrencyValue = get_default_currency_value?.data?.message;
  } else {
    fetchedDataFromServer.defaultCurrencyValue = {};
  }
  let get_multi_lingual_data_value: any = await MultiLangApi();
  if (get_multi_lingual_data_value?.length > 0) {
    fetchedDataFromServer.multiLingualValues = get_multi_lingual_data_value;
  } else {
    fetchedDataFromServer.multiLingualValues = [];
  }

  return { ...appProps, fetchedDataFromServer };
};

export default MyApp;
