import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import useWishlist from '../../hooks/WishlistHooks/useWishlistHook';
import { selectCart } from '../../store/slices/cart-slices/cart-local-slice';
const NoDataFound = dynamic(() => import('../NoDataFound'));
const ProductCard = dynamic(() => import('../../cards/ProductCard'));
const ProductDetailDrawer = dynamic(() => import('../ProductDetailComponents/ProductDetailDrawer/ProductDetailDrawer'));
const ProductCardSkeleton = dynamic(() => import('../../cards/ProductCardSkeleton'));

const WishlistMaster = () => {
  const { wishlistData, isLoading } = useWishlist();
  const cartData = useSelector(selectCart)?.items
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
                <ProductCard data={item} handleShow={handleShow} wishlistData={wishlistData} btnAction={'Add'} cartData={cartData} />
              </div >
            ))}
        </div >
      );
    }
    if (wishlistData?.length === 0) {
      return <NoDataFound title="Wishlist list is empty !!" message="Add Items to wishlist to view wishlist list." />;
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
