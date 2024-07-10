import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import ProductCard from '../../../cards/ProductCard';
import ProductCardSkeleton from '../../Skeleton/ProductCardSkeleton';
import SliderNextArrow from './SliderNextArrow';
import SliderPrevArrow from './SliderPrevArrow';

const SliderSection = ({ data }: any) => {
  useEffect(() => {
    AOS.init();
  }, []);
  const settings = {
    dots: false,
    infinite: true,
    slidesPerRow: 1,
    slidesToShow: data.value?.length > 4 ? 4 : data.value?.length,
    slidesToScroll: 1,
    nextArrow: <SliderNextArrow />,
    prevArrow: <SliderPrevArrow />,
    pauseOnHover: true,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bgImageWrapper">
      <div className={`container-fluid `} style={{ zIndex: '2', position: 'relative' }}>
        <div className="row">
          <Slider {...settings}>
            {data.value?.length > 0 &&
              data.value.map((item: any, index: any) => (
                <div key={index} className="col-lg-3 col-md-3 col-6">
                  <ProductCard data={item} />
                </div>
              ))}
            {data?.length === 0 &&
              [...Array(2)].map((_, index) => (
                <div key={index} className="col-lg-3 col-md-3 col-6 mx-2">
                  <ProductCardSkeleton />
                </div>
              ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default SliderSection;
