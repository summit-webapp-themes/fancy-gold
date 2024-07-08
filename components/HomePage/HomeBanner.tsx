import React from 'react';
import { CONSTANTS } from '../../services/config/app-config';
import Image from 'next/image';
import useHomeBanner from '../../hooks/HomePageHooks/HomeBannerHook';
import Link from 'next/link';

const HomeBanner = () => {
  const { homeBannerData } = useHomeBanner();

  const imageLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <>
      <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {homeBannerData?.length > 0 &&
            homeBannerData.map((banner: any, index: any) => (
              <>
                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                  <Image
                    loader={imageLoader}
                    src={banner.img}
                    width={1600}
                    height={500}
                    alt="Home Banner images"
                    style={{ width: '100%', height: '100%' }}
                  />
                  {banner?.btn_info?.length > 0 &&
                    banner?.btn_info.map((data: any) => (
                      <div className="carousel-caption d-none d-md-block banner_caption_btn text-end">
                        <Link href={data.btn_url}>
                          <button className="btn btn-primary">{data.btn_title}</button>
                        </Link>
                      </div>
                    ))}
                </div>
              </>
            ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};

export default HomeBanner;
