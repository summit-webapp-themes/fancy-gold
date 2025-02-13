import type { NextPage } from 'next';
import HomePage from '../components/HomePage/HomePage';
import MetaTag from '../services/api/general-apis/meta-tag-api';
import { CONSTANTS } from '../services/config/app-config';
import { returnLastPageViewedData, setRecentPageData } from '../utils/get-last-page-viewed-data';
import { useEffect } from 'react';
import { emitSocketEvent } from '../utils/http-methods';
import { useHandleClientInteractivity } from '../hooks/SocketHooks/useHandleClientInteractivity';

const Home: NextPage = () => {
  const { userEventRegistered, handleVisibilityChange } = useHandleClientInteractivity();

  const getLastViewedPage = returnLastPageViewedData();
  setRecentPageData('Home Page', 'home');

  const userName = localStorage.getItem('party_name');

  useEffect(() => {
    const userObj = {
      name: userName,
      phone: '',
    };
    const eventData = {
      page_type: 'Home Page',
      page_id: 'home',
      action: 'Page View',
      reference_type: getLastViewedPage?.reference_type,
      reference_id: getLastViewedPage?.reference_id,
      user_data: userObj,
      is_active: true,
    };
    emitSocketEvent(eventData);
    userEventRegistered();
  }, []);

  useEffect(() => {
    function handleClientVisibility(documentVisibility: any) {
      handleVisibilityChange(documentVisibility);
    }
    document.addEventListener('visibilitychange', () => handleClientVisibility(document.visibilityState));
    return () => {
      // window.removeEventListener('beforeunload', () => handleSiteInSleepMode(name));
      document.removeEventListener('visibilitychange', handleClientVisibility);
    };
  }, [document.visibilityState]);
  return (
    <div>
      <HomePage />
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const { SUMMIT_APP_CONFIG } = CONSTANTS;
  let fetchedDataFromServer: any = {};
  const method = 'get_meta_tags';
  const version = 'v1';
  const entity = 'seo';
  const params = `?version=${version}&method=${method}&entity=${entity}`;
  const url = `${context.resolvedUrl.split('?')[0]}`;

  if (CONSTANTS.ENABLE_META_TAGS) {
    let meta_data: any = await MetaTag(`${CONSTANTS.API_BASE_URL}${SUMMIT_APP_CONFIG.app_name}${params}&page_name=${url}`);
    if (meta_data?.status === 200 && Object.keys(meta_data).length > 0) {
      fetchedDataFromServer.metaTagsDataFromAPI = meta_data?.data?.message?.data;
    } else {
      fetchedDataFromServer = {};
    }
  }
  return { props: fetchedDataFromServer };
}

export default Home;
