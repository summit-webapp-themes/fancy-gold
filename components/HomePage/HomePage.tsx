import React from 'react';
import dynamic from 'next/dynamic';
import BannerSkeleton from './Banner/BannerSkeleton';
import DisplayTagLoadingComponnet from './DisplayTags/DisplayTagLoadingComponnet';
import { returnLastPageViewedData, setRecentPageData } from '../../utils/get-last-page-viewed-data';
const Banner = dynamic(() => import('./Banner/Banner'), { loading: () => <BannerSkeleton /> });
const DisplayTags = dynamic(() => import('./DisplayTags/DisplayTags'), { loading: () => <DisplayTagLoadingComponnet /> });
const HomePage = () => {
  return (
    <>
      <Banner />
      <DisplayTags />
    </>
  );
};

export default HomePage;
