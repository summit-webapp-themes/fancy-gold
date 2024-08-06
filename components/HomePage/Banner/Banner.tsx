import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'next/image';
import useBanner from '../../../hooks/HomePageHooks/BannerHook';
import { CONSTANTS } from '../../../services/config/app-config';
import BannerSkeleton from './BannerSkeleton';
import BannerStyles from '../../../styles/components/banner.module.scss';

const Banner = () => {
  const { isLoading, allBannerData }: any = useBanner();
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: any) => {
    setIndex(selectedIndex);
  };

  const imageLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
  };
  const handleDataRendering = () => {
    if (isLoading) {
      return (
        <>
          <BannerSkeleton />
        </>
      );
    }
    if (allBannerData?.length > 0) {
      return (
        <div>
          <Carousel activeIndex={index} onSelect={handleSelect}>
            {allBannerData?.map((banner: any, index: number) => (
              <Carousel.Item key={index} className={`${BannerStyles.image_wrapper}`}>
                <Image
                  loader={imageLoader}
                  className={`d-block w-100`}
                  src={`${banner?.img}`}
                  alt="Banner Images"
                  priority
                  width={1000}
                  height={550}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      );
    }
  };
  return <>{handleDataRendering()}</>;
};

export default Banner;
