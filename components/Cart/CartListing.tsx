import { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Image from 'next/image';
import useCartPageHook from '../../hooks/CartPageHook/useCartPageHook';
import image from '../../public/assets/images/no-data.svg';
import { selectCart } from '../../store/slices/cart-slices/cart-local-slice';
import CartProductDetail from './CartProductDetail';
import CartSkeleton from './CartSkeleton';
import SizeQtyTable from './SizeQtyTable';
import useAddToCartHook from '../../hooks/CartPageHook/useAddToCart';
import styles from '../../styles/components/cartProductDetail.module.scss';
import NoDataStyles from '../../styles/components/noData.module.scss';

const CartListing = () => {
  const { cartListingItems, setCartListingItems, isLoading, fetchCartListingData } = useCartPageHook();
  const { addToCartItem, placeOrderAPIFunc, RemoveItemCartAPIFunc } = useAddToCartHook();
  const [deliveryDate, setDeliveryDate] = useState('');
  const [wastage, setWastage] = useState('');
  const user = localStorage.getItem('user');
  const cartList = useSelector(selectCart)?.items;
  useEffect(() => {
    if (cartListingItems?.transaction_date) {
      const transactionDate = new Date(cartListingItems.transaction_date);
      transactionDate.setDate(transactionDate.getDate() + 15);
      setDeliveryDate(transactionDate.toISOString().split('T')[0]);
    }
  }, [cartListingItems?.transaction_date]);

  const handleDeleteRow = (itemCode: string) => {
    const params = {
      item_code: itemCode,
      quotation_id: cartListingItems?.name,
    };
    RemoveItemCartAPIFunc(params, fetchCartListingData);
  };

  const handleQtyChange = (categoryIndex: number, orderIndex: number, sizeIndex: number, newQty: number, data: any) => {
    const updatedItems = { ...cartListingItems };
    updatedItems.categories[categoryIndex].orders[orderIndex].order[sizeIndex].qty = newQty;
    setCartListingItems(updatedItems);
    const updatedOrder =
      data?.order?.length > 0 &&
      data?.order?.map((item: any) => {
        return {
          size: item?.size,
          qty: item?.qty,
          colour: item?.colour,
        };
      });
    const addToCartParams = {
      item_code: data?.item_code,
      party_name: cartListingItems?.party_name,
      purity: cartListingItems?.purity,
      cust_name: cartListingItems?.cust_name,
      colour: data?.colour,
      wastage: data?.wastage,
      qty_size_list: updatedOrder,
      remark: cartListingItems?.remark,
      user: user,
    };
    addToCartItem(addToCartParams, fetchCartListingData);
  };
  const handleDeleteSize = (categoryIndex: number, orderIndex: number, sizeIndex: number, data: any) => {
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
    addToCartItem(addToCartParams, fetchCartListingData);
  };
  const handlePlaceOrder = async () => {
    const selectedDate = new Date(deliveryDate);
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 15);
    selectedDate.setHours(0, 0, 0, 0);
    minDate.setHours(0, 0, 0, 0);
    const params = {
      order_id: cartListingItems?.name,
      party_name: cartListingItems?.party_name,
    };
    if (selectedDate < minDate) {
      toast.error('Delivery date cannot be before 15 days from the transaction date.');
    } else {
      placeOrderAPIFunc(params);
    }
  };

  const handleEditWastage = (data: any) => {
    const addToCartParams = {
      item_code: data?.item_code,
      party_name: cartListingItems?.party_name,
      purity: cartListingItems?.purity,
      cust_name: cartListingItems?.cust_name,
      colour: data?.colour,
      wastage: wastage,
      qty_size_list: data?.order,
      remark: cartListingItems?.remark,
      user: user,
    };
    addToCartItem(addToCartParams, fetchCartListingData);
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
                          <CartProductDetail data={order} wastage={wastage} setWastage={setWastage} handleEditWastage={handleEditWastage} />
                        </div>
                        <div className={`col-lg-4 ${styles.border}`}>
                          <SizeQtyTable
                            data={order}
                            onQtyChange={(sizeIndex: number, newQty: number, data: any) =>
                              handleQtyChange(categoryIndex, orderIndex, sizeIndex, newQty, data)
                            }
                            onDelete={(sizeIndex: number, data: any) => handleDeleteSize(categoryIndex, orderIndex, sizeIndex, data)}
                          />
                        </div>
                        <div className={`col-lg-1 ${styles.cross_icon_container} `}>
                          <RxCross2
                            onClick={() => {
                              handleDeleteRow(order?.item_code);
                            }}
                          />
                        </div>
                      </>
                    ))}
                </div>
              </div>
            ))}
            <div className='d-flex justify-content-between'>
              <textarea className='w-50 p-3' rows={2} placeholder='Terms and Conditions'></textarea>
              <div className={`${styles.place_order_container}`}>
                <h3>Grand Total weight : {cartListingItems?.grand_total_weight}</h3>
                <div className='d-flex justify-content-end w-100'>

              <button className={`${styles?.place_order_btn}`} onClick={handlePlaceOrder}>
                Place Order
              </button>
                </div>
            </div>
            </div>
        </div>
      );
    }
    if (!cartList) {
      return (
        <div className={`text-center ${NoDataStyles.no_data_image}`}>
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
