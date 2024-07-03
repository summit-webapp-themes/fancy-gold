import type { NextPage } from 'next';
import HomePage from '../components/HomePage';
import { useDispatch } from 'react-redux';
import { setDefaultCurrencyValue } from '../store/slices/general_slices/multi-currency-slice';
import { setMultiLingualData } from '../store/slices/general_slices/multilang-slice';
import { setRevalidationTime } from '../store/slices/general_slices/cache-slice';
import { askForPermissionToReceiveNotifications } from '../push-notifications';

const Home: NextPage = ({ fetchedDataFromServer }: any) => {
  askForPermissionToReceiveNotifications();
  console.log('check data of server obj', fetchedDataFromServer);
  const dispatch = useDispatch();
  const getCurrentTimestamp = Date.now();
  dispatch(setRevalidationTime(getCurrentTimestamp));
  dispatch(
    setDefaultCurrencyValue(fetchedDataFromServer?.defaultCurrencyValue)
  );
  dispatch(setMultiLingualData(fetchedDataFromServer?.multiLingualValues));

  return (
    <div>
      <HomePage />
    </div>
  );
};

export default Home;
