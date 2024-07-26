import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'next/image';
import useBanner from '../../../hooks/HomePageHooks/BannerHook';
import { CONSTANTS } from '../../../services/config/app-config';
import BannerSkeleton from './BannerSkeleton';
import CarouselCaption from 'react-bootstrap/CarouselCaption';
import BannerStyles from '../../../styles/components/banner.module.scss';
import { FaForward } from 'react-icons/fa6';

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
              <Carousel.Item key={index}>
                <Image
                  loader={imageLoader}
                  className={`d-block w-100 `}
                  src={`${banner?.img}`}
                  alt="Banner Images"
                  priority
                  width={1024}
                  height={550}
                />

                <CarouselCaption className="corousel-caption ">
                  <div className={`text-start `} key={index}>
                    <span className={`text-white banner-btn theme-blue-bg theme-btn-blue px-3 ${BannerStyles.banner_btn}`}>
                      Shop Now &nbsp; <FaForward />
                    </span>
                  </div>
                </CarouselCaption>
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
