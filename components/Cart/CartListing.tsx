import React from 'react';
import CartProductDetail from './CartProductDetail';
import useCartPageHook from '../../hooks/CartPageHook/cart-page-hook';
import styles from '../../styles/components/cartProductDetail.module.scss'

const CartListing = () => {
  const { cartListingItems, isLoading } = useCartPageHook();
  return (
    <div className="container">
      <h2 className="theme-blue text-center my-3">My Shopping Cart</h2> 
      {!isLoading && (

      <div className="border p-3">
        <div className="d-flex justify-content-between">
          <div>
            <label>Customer Name: {cartListingItems?.party_name} </label>
            <br />
            <label>Order Purity: {cartListingItems?.categories?.length > 0 && cartListingItems?.categories[0]?.orders[0]?.stock_uom}</label>
            <div>
              <label>Delivery Date: </label>
              <input type="date" value={cartListingItems?.transaction_date} />
            </div>
          </div>
          <div>
            <button className="btn btn-primary">Place Order</button>
          </div>
        </div>
        <hr className='mt-3'/>
        <div className="p-3">
          <h5 className="py-2">{cartListingItems?.categories?.length > 0 && cartListingItems?.categories[0]?.category} | Total Weight:</h5>
          <div className={`row ${styles?.table_header}`}>
            <div className="col-lg-5 text-center">Products</div>
            <div className="col-lg-2 text-center">Note</div>
            <div className="col-lg-5"></div>
          </div>
          <div className="row">
            <div className={`col-lg-7 ${styles.border}`}>
              <CartProductDetail data={cartListingItems?.categories?.length > 0 && cartListingItems?.categories[0]?.orders} />
            </div>
            <div className={`col-lg-5 ${styles.border}`}></div>
          </div>
        </div>
      </div>
      ) }
    </div>
  );
};

export default CartListing;
