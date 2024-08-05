import React, { useState } from 'react';
import Image from 'next/image';
import useWishlist from '../../hooks/WishlistHooks/useWishlistHook';
import image from '../../public/assets/images/no-data.svg';
import ProductCard from '../../cards/ProductCard';
import ProductDetailDrawer from '../ProductDetailComponents/ProductDetailDrawer/ProductDetailDrawer';
import ProductCardSkeleton from '../../cards/ProductCardSkeleton';
import NoDataStyles from '../../styles/components/noData.module.scss';

const WishlistMaster = () => {
  const { wishlistData, isLoading } = useWishlist();
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
  const handleDataRendering = () => {
    if (isLoading) {
      return (
        <div className="row ">
          {[...Array(10)].map(() => (
            <>
              <div className="col-md-3 col-lg-3 col-sm-6 mb-3 p-1">
                <ProductCardSkeleton />
              </div>
            </>
          ))}
        </div>
      );
    }
    if (wishlistData?.length > 0) {
      return (
        <div className="d-flex flex-wrap ">
          {wishlistData?.length > 0 &&
            wishlistData?.map((item: any, index: number) => (
              <div key={index} className="col-sm-6 col-lg-3 col-xl-3 col-xxl-3 text-center mb-4 px-3">
                <ProductCard data={item} handleShow={handleShow} wishlistData={wishlistData} />
              </div>
            ))}
        </div>
      );
    }
    if (wishlistData?.length === 0) {
      return (
        <div className={`text-center ${NoDataStyles.no_data_image}`}>
          <div className="p-3" style={{ fontSize: '40px' }}>
            <Image src={image} width={200} height={200} alt="Error Image" />
          </div>
          <div className="text-center">
            <h2 className="theme-blue">Wishlist is Empty !!</h2>
          </div>
        </div>
      );
    }
  };
  return (
    <div className="container">
      <h2 className="theme-blue text-center my-3">My Wishlist</h2>
      {handleDataRendering()}
      <ProductDetailDrawer show={show} handleClose={handleClose} data={drawerData} />
    </div>
  );
};

export default WishlistMaster;
