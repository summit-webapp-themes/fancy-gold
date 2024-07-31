import React from 'react';
import cartListingStyles from '../styles/components/cart.module.scss';
import useCartPageHook from '../hooks/CartPageHooks/cart-page-hook';

const CartListing = () => {
  const { cartListingItems, isLoading, errorMessage } = useCartPageHook();

  return (
    <>
      <h3 className="text-center my-3">My Shopping Cart</h3>
      <div className="container border">
        <div className="d-flex justify-content-between mt-1">
          <div>
            <ul className="list-unstyled">
              <li className={`${cartListingStyles.section_text}`}>
                <b> Customer Name:</b> {cartListingItems?.party_name}
              </li>
              <li className={`${cartListingStyles.section_text}`}>
                <b> Order Purity:</b>
              </li>
              <li className={`${cartListingStyles.section_text}`}>
                <b>Delivery Date:</b>
              </li>
            </ul>
          </div>
          <div>
            <button className={`btn btn-outline-primary text-uppercase mb-0 p-1 ${cartListingStyles.place_order_btn}`}>Place Order</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartListing;
