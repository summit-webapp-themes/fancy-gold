import type { NextPage } from 'next';
import HomePage from '../components/HomePage';
import { askForPermissionToReceiveNotifications } from '../push-notifications';
import MetaTag from '../services/api/general_apis/meta-tag-api';
import { CONSTANTS } from '../services/config/app-config';

const Home: NextPage = (fetchedDataFromServer: any) => {
  askForPermissionToReceiveNotifications();
  return (
    <div>
      <HomePage
      />
    </div>
  );
};

export async function getServerSideProps(context: any) {
  let fetchedDataFromServer: any = {};
  const method = 'get_meta_tags';
  const version = 'v1';
  const entity = 'seo';
  const params = `?version=${version}&method=${method}&entity=${entity}`;
  const url = `${context.resolvedUrl.split('?')[0]}`;

  if (CONSTANTS.ENABLE_META_TAGS) {
    let meta_data: any = await MetaTag(
      `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}${params}&page_name=${url}`
    );
    if (meta_data?.status === 200 && Object.keys(meta_data).length > 0) {
      fetchedDataFromServer.metaTagsDataFromAPI =
        meta_data?.data?.message?.data;
    } else {
      fetchedDataFromServer = {};
    }
  }
  return { props: fetchedDataFromServer };
}

export default Home;
