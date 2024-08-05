import Image from 'next/image';
import { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { useSelector } from 'react-redux';
import useCartPageHook from '../../hooks/CartPageHook/useCartPageHook';
import image from '../../public/assets/images/no-data.svg';
import { selectCart } from '../../store/slices/cart-slices/cart-local-slice';
import styles from '../../styles/components/cartProductDetail.module.scss';
import CartProductDetail from './CartProductDetail';
import CartSkeleton from './CartSkeleton';
import SizeQtyTable from './SizeQtyTable';
import NoDataStyles from '../../styles/components/noData.module.scss';
import useAddToCartHook from '../../hooks/CartPageHook/useAddToCart';

const CartListing = () => {
  const { cartListingItems, setCartListingItems, isLoading } = useCartPageHook();
  const { addToCartItem, placeOrderAPIFunc } = useAddToCartHook();
  const [deliveryDate, setDeliveryDate] = useState('');
  const user = localStorage.getItem('user');
  const cartList = useSelector(selectCart)?.items

  useEffect(() => {
    if (cartListingItems?.transaction_date) {
      const transactionDate = new Date(cartListingItems.transaction_date);
      transactionDate.setDate(transactionDate.getDate() + 15);
      setDeliveryDate(transactionDate.toISOString().split('T')[0]);
    }
  }, [cartListingItems?.transaction_date]);

  const handleDeleteRow = (categoryIndex: any, orderIndex: number) => {
    const updatedItems = { ...cartListingItems };
    updatedItems.categories[categoryIndex].orders.splice(orderIndex, 1);
    setCartListingItems(updatedItems);
  };

  const handleQtyChange = (categoryIndex: number, orderIndex: number, sizeIndex: number, newQty: number,data:any) => {
    const updatedItems = { ...cartListingItems };
    updatedItems.categories[categoryIndex].orders[orderIndex].order[sizeIndex].qty = newQty;
    setCartListingItems(updatedItems);
    const addToCartParams = {
      item_code: data?.item_code,
      party_name: cartListingItems?.party_name,
      purity: cartListingItems?.purity,
      cust_name: cartListingItems?.cust_name,
      colour: data?.colour,
      wastage: data?.wastage,
      qty_size_list: data?.order,
      remark: cartListingItems?.remark,
      user: user,
    };
    addToCartItem(addToCartParams);
  };
  const handleDeleteSize = (categoryIndex: number, orderIndex: number, sizeIndex: number, data:any) => {
    if (!cartListingItems) return;
    const updatedItems = { ...cartListingItems };
    updatedItems.categories[categoryIndex]?.orders[orderIndex]?.order.splice(sizeIndex, 1);
    setCartListingItems(updatedItems);
    const addToCartParams = {
      item_code: data?.item_code,
      party_name: cartListingItems?.party_name,
      purity: cartListingItems?.purity,
      cust_name: cartListingItems?.cust_name,
      colour: data?.colour,
      wastage: data?.wastage,
      qty_size_list: data?.order,
      remark: cartListingItems?.remark,
      user: user,
    };
    addToCartItem(addToCartParams);
  };
  const handlePlaceOrder = async () => {
    const selectedDate = new Date(deliveryDate);
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 15);
    selectedDate.setHours(0, 0, 0, 0);
    minDate.setHours(0, 0, 0, 0);
    console.log(selectedDate, minDate, 'cart');
    const params = {
      order_id: cartListingItems?.name,
      party_name: cartListingItems?.party_name,
    };
    if (selectedDate < minDate) {
      alert('Delivery date cannot be before 15 days from the transaction date.');
    } else {
      placeOrderAPIFunc(params);
    }
  };
  
  const handleDataRendering = () => {
    if (isLoading) {
      return <CartSkeleton />;
    }
    if (cartListingItems?.categories?.length > 0) {
      return (
        <div className="border p-3">
          <div className="d-flex justify-content-between">
            <div>
              <label>Customer Name: {cartListingItems?.party_name} </label>
              <br />
              <label>Order Purity: {cartListingItems?.purity}</label>
              <div>
                <label>Delivery Date: </label>
                <input type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} min={deliveryDate} />
              </div>
            </div>
            <div className={`${styles.place_order_container}`}>
              <button className={`${styles?.place_order_btn}`} onClick={handlePlaceOrder}>
                Place Order
              </button>
            </div>
          </div>
          <hr className="mt-3" />
          {cartListingItems?.categories?.length > 0 &&
            cartListingItems?.categories?.map((category: any, categoryIndex: number) => (
              <div className="p-3" key={categoryIndex}>
                <h5 className="py-2">
                  {category?.category} | Total Weight: {category?.total_weight}gm
                </h5>
                <div className={`row ${styles?.table_header}`}>
                  <div className="col-lg-5 text-center">Products</div>
                  <div className="col-lg-2 text-center">Note</div>
                  <div className="col-lg-5"></div>
                </div>
                <div className="row">
                  {category?.orders?.length > 0 &&
                    category?.orders?.map((order: any, orderIndex: any) => (
                      <>
                        <div className={`col-lg-7 ${styles.border}`}>
                          <CartProductDetail data={order} />
                        </div>
                        <div className={`col-lg-4 ${styles.border}`}>
                          <SizeQtyTable
                            data={order}
                            onQtyChange={(sizeIndex: number, newQty: number,data:any) =>
                              handleQtyChange(categoryIndex, orderIndex, sizeIndex, newQty,data)
                            }
                            onDelete={(sizeIndex: number,data:any) => handleDeleteSize(categoryIndex, orderIndex, sizeIndex,data)}
                          />
                        </div>
                        <div className={`col-lg-1 ${styles.cross_icon_container} `}>
                          <RxCross2
                            onClick={() => {
                              handleDeleteRow(categoryIndex, orderIndex);
                            }}
                          />
                        </div>
                      </>
                    ))}
                </div>
              </div>
            ))}
        </div>
      );
    }
    if (!cartList) {
      return (
        <div className={`text-center $`}>
          <div className="p-3" style={{ fontSize: '40px' }}>
            <Image src={image} width={200} height={200} alt="Error Image" />
          </div>
          <div className="text-center">
            <h2 className="theme-blue">Cart is Empty !!</h2>
          </div>
        </div>
      );
    }
  };
  return (
    <div className="container">
      <h2 className="theme-blue text-center my-3">My Shopping Cart</h2>
      {handleDataRendering()}
    </div>
  );
};

export default CartListing;
