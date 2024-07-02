import React from 'react';
import { ToastContainer } from 'react-bootstrap';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '../store/store';
import Layout from '../components/Layout';
import '../styles/globals.scss';
import { getMultiCurrencyValue } from '../services/api/general_apis/default-currency-api';
import MultiLangApi from '../services/api/general_apis/multilanguage-api';

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <div>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Layout>
            {/* <ToastContainer
              position="top-right"
              autoClose={8000}
              hideProgressBar={false}
              newestOnTop={false}
              draggable={false}
              closeOnClick
              pauseOnHover
            /> */}
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default MyApp;
// export async function getServerSideProps() {
//   let fetchedDataFromServer: any = {};
//   let get_default_currency_value: any = await getMultiCurrencyValue();
//   if (get_default_currency_value?.status === 200) {
//     fetchedDataFromServer.defaultCurrencyValue =
//       get_default_currency_value?.data?.message;
//   } else {
//     fetchedDataFromServer.defaultCurrencyValue = {};
//   }
//   let get_multi_lingual_data_value: any = await MultiLangApi();
//   if (get_multi_lingual_data_value?.length > 0) {
//     fetchedDataFromServer.multiLingualValues = get_multi_lingual_data_value;
//   } else {
//     fetchedDataFromServer.multiLingualValues = [];
//   }
//   return { props: fetchedDataFromServer };
// }
