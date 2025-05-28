import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Slider from 'react-slick';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import ProductCardSkeleton from '../../Skeleton/ProductCardSkeleton';
import SliderNextArrow from './SliderNextArrow';
import SliderPrevArrow from './SliderPrevArrow';
import ProductCard from '../../../cards/ProductCard';
const ProductDetailDrawer = dynamic(() => import('../../ProductDetailComponents/ProductDetailDrawer/ProductDetailDrawer'));
import SliderStyles from '../../../styles/components/sliderSection.module.scss';
import { useSelector } from 'react-redux';
import { selectWishlist } from '../../../store/slices/wishlist-slices/wishlist-local-slice';
import { selectCart } from '../../../store/slices/cart-slices/cart-local-slice';

const SliderSection = ({ data }: any) => {
  const wishlistData = useSelector(selectWishlist)?.items;
  const cartData = useSelector(selectCart)?.items;

  const [show, setShow] = useState(false);
  const [drawerData, setDrawerData] = useState({ productName: '', variantOf: '' });

  const handleClose = () => {
    setDrawerData({ productName: '', variantOf: '' });
    setShow(false);
  };
  const handleShow = (productName: string, variantOf: string) => {
    setDrawerData((prev: any) => ({ ...prev, productName: productName, variantOf: variantOf }));
    setShow(true);
  };
  useEffect(() => {
    AOS.init();
  }, []);
  const settings = {
    dots: false,
    infinite: data.value?.length > 1,
    slidesPerRow: 1,
    slidesToShow: data.value?.length > 4 ? 4 : data.value?.length,
    slidesToScroll: 1,
    nextArrow: <SliderNextArrow />,
    prevArrow: <SliderPrevArrow />,
    pauseOnHover: true,
    autoplay: true,
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

  const showSliderSection: any = () => {
    if (data?.value?.length === 0) {
      return (
        <div className={`container`}>
          <div className="row">
            <Slider {...settings}>
              {[...Array(2)].map((_, index) => (
                <div key={index} className="col-12">
                  <ProductCardSkeleton />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      );
    }

    if (data?.value?.length > 0) {
      return (
        <>
          <div className={`container`} style={{ zIndex: '2', position: 'relative' }}>
            <div className="row">
              <Slider {...settings}>
                {data.value?.length > 0 &&
                  data.value.map((item: any, index: any) => (
                    <div
                      key={index}
                      className={`col-sm-6 col-lg-5 col-xl-4 col-xxl-3 text-center mb-4 ${SliderStyles.productCard_slider_wrapper}`}
                    >
                      <ProductCard data={item} handleShow={handleShow} wishlistData={wishlistData} btnAction={'View'} cartData={cartData} />
                    </div>
                  ))}
              </Slider>
              <ProductDetailDrawer show={show} handleClose={handleClose} data={drawerData} />
            </div>
          </div>
        </>
      );
    }
  };

  return <div className="bgImageWrapper">{showSliderSection()}</div>;
};

export default SliderSection;
