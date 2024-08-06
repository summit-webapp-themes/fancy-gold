import CartProductDetail from './CartProductDetail';
import useCartPageHook from '../../hooks/CartPageHook/useCartPageHook';
import styles from '../../styles/components/cartProductDetail.module.scss';

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
              <label>Order Purity: {cartListingItems?.purity}</label>
              <div>
                <label>Delivery Date: </label>
                <input type="date" value={cartListingItems?.transaction_date} />
              </div>
            </div>
            <div>
              <button className={`${styles?.place_order_btn}`}>Place Order</button>
            </div>
          </div>
          <hr className="mt-3" />
          {cartListingItems?.categories?.length > 0 &&
            cartListingItems?.categories?.map((category: any, index: number) => (
              <div className="p-3" key={index}>
                <h5 className="py-2">{category?.category} | Total Weight:</h5>
                <div className={`row ${styles?.table_header}`}>
                  <div className="col-lg-5 text-center">Products</div>
                  <div className="col-lg-2 text-center">Note</div>
                  <div className="col-lg-5"></div>
                </div>
                <div className="row">
                  {category?.orders?.length > 0 &&
                    category?.orders?.map((order: any, idx: any) => (
                      <div className={`col-lg-7 ${styles.border}`}>
                        <CartProductDetail data={order} />
                      </div>
                    ))}
                  <div className={`col-lg-5 ${styles.border}`}></div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default CartListing;
