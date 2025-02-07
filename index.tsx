import type { NextPage } from 'next';
import HomePage from '../components/HomePage/HomePage';
import MetaTag from '../services/api/general-apis/meta-tag-api';
import { CONSTANTS } from '../services/config/app-config';
import { returnLastPageViewedData, setRecentPageData } from '../utils/get-last-page-viewed-data';
import { useEffect } from 'react';
import { eventTracker } from '../utils/socket-functions';

const Home: NextPage = () => {
  const getLastViewedPage = returnLastPageViewedData();
  setRecentPageData('Home Page', 'home');

  const userName = localStorage.getItem('party_name');

  useEffect(() => {
    const userObj = {
      name: userName,
      phone: '',
    };
    eventTracker('Home Page', 'home page', 'Page View', getLastViewedPage?.reference_type, getLastViewedPage?.reference_id, userObj);
  }, []);
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
