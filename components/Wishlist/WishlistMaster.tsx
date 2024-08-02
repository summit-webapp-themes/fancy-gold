import React, { useState } from 'react'
import useWishlist from '../../hooks/WishlistHooks/useWishlistHook'
import ProductCard from '../../cards/ProductCard'
import ProductDetailDrawer from '../ProductDetailComponents/ProductDetailDrawer/ProductDetailDrawer'

const WishlistMaster = () => {
    const {wishlistData}=useWishlist()
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
    const handleDataRender = ()=>{

    }
  return (
    <div className='container'>
        <h2 className="theme-blue text-center my-3">My Wishlist</h2>
        <div className='d-flex flex-wrap '>
        {wishlistData?.length > 0 && wishlistData?.map ((item:any,index:number)=>(
            <div key={index} className="col-sm-6 col-lg-3 col-xl-3 col-xxl-3 text-center mb-4 px-3">
            <ProductCard data={item} handleShow={handleShow} wishlistData={wishlistData}/>
          </div>
        ))}

        </div>
        <ProductDetailDrawer show={show} handleClose={handleClose} data={drawerData} />
    </div>
  )
}

export default WishlistMaster