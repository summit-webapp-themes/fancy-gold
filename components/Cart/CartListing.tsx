import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useAddToCartHook from '../../hooks/CartPageHook/useCartFunctions';
import useCartPageHook from '../../hooks/CartPageHook/useFetchCartItems';
import { selectCart } from '../../store/slices/cart-slices/cart-local-slice';
import styles from '../../styles/components/cartProductDetail.module.scss';
import { Spinner } from 'react-bootstrap';
import ClearCartModal from './ClearCartModal';
import { it } from 'node:test';
const ApiErrorPage = dynamic(() => import('../ApiErrorPage'));
const CartSkeleton = dynamic(() => import('./CartSkeleton'));
const CartProductDetail = dynamic(() => import('./CartProductDetail'));
const SizeQtyTable = dynamic(() => import('./SizeQtyTable'));
const NoDataFound = dynamic(() => import('../NoDataFound'));

const CartListing = () => {
  const { cartListingItems, setCartListingItems, isLoading, errorMessage, purity } = useCartPageHook();
  const { addToCartItem, placeOrderAPIFunc, RemoveItemCartAPIFunc, disableRemove, cLearCartAPIFunc, updateCartData } = useAddToCartHook();
  const [updatedPurity, setUpdatedPurity] = useState('');
  const [selectedPurity, setSelectedPurity] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [isCustomerNameUpdateLoading, setCustomerNameUpdateLoading] = useState(false);
  const [isPurityUpdateLoading, setIsPurityUpdateLoading] = useState(false);
  const [isHandlePlaceOrderLoading, setIsHandlePlaceOrderLoading] = useState(false);
  const [modifiedPurity, setModifiedPurity] = useState<any>([]);
  const { quotation_Id } = useSelector(selectCart);
  const user = localStorage.getItem('user');
  const partyName = localStorage.getItem('party_name');
  const [showClearCartModal, setShowClearCartModal] = useState(false);

  const handleCloseClearCartModal = () => setShowClearCartModal(false);
  const handleShowClearCartModal = () => setShowClearCartModal(true);

  useEffect(() => {
    if (cartListingItems?.transaction_date) {
      const transactionDate = new Date(cartListingItems.transaction_date);
      transactionDate.setDate(transactionDate.getDate() + 16);
      setDeliveryDate(transactionDate.toISOString().split('T')[0]);
    }
  }, [cartListingItems?.transaction_date]);

  useEffect(() => {
    if (cartListingItems?.cust_name) {
      setCustomerName(cartListingItems?.cust_name);
    }
    if (cartListingItems?.purity) {
      setUpdatedPurity(cartListingItems?.purity);
      localStorage.setItem('localPurity', cartListingItems?.purity);
      const selectedPurity = purity.find((item: any) => item.name === cartListingItems?.purity);
      setModifiedPurity([selectedPurity, ...purity.filter((item: any) => item.name !== cartListingItems?.purity)]);
    }
  }, [cartListingItems?.cust_name, cartListingItems?.purity, purity]);

  const handleDeleteRow = (itemCode: string, size?: string | number) => {
    const params = {
      item_code: itemCode,
      quotation_id: cartListingItems?.name,
      ...(size && { size: Number(size) }),
    };
    RemoveItemCartAPIFunc(params, setCartListingItems);
  };
  // to update Cart list after updating Quantity or wastage
  const handleUpdateListData = (data: any) => {
    const updatedOrder =
      data?.order?.length > 0 &&
      data?.order?.map((item: any) => {
        return {
          size: item?.size,
          quantity: item?.qty,
          colour: item?.colour,
        };
      });
    const addToCartParams = {
      item_code: data?.item_code,
      party_name: partyName,
      purity: cartListingItems?.purity,
      cust_name: cartListingItems?.cust_name,
      colour: data?.colour,
      wastage: data?.wastage,
      qty_size_list: updatedOrder || data?.order,
      remark: cartListingItems?.remark,
      user: user,
    };
    addToCartItem(addToCartParams, setCartListingItems);
  };

  const handleQtyChange = (categoryIndex: number, orderIndex: number, sizeIndex: number, newQty: number, data: any) => {
    const updatedItems = { ...cartListingItems };
    updatedItems.categories[categoryIndex].orders[orderIndex].order[sizeIndex].qty = newQty;
    setCartListingItems(updatedItems);

    handleUpdateListData(data);
  };
  const handleDeleteSize = (categoryIndex: number, orderIndex: number, sizeIndex: number, data: any) => {
    if (!cartListingItems) return;
    const updatedItems = { ...cartListingItems };
    updatedItems.categories[categoryIndex]?.orders[orderIndex]?.order.splice(sizeIndex, 1);
    setCartListingItems(updatedItems);
    handleUpdateListData(data);
  };

  const handlePlaceOrder = async () => {
    if (isHandlePlaceOrderLoading) return; // Prevent multiple clicks while loading
    setIsHandlePlaceOrderLoading(true); // Start loader

    const selectedDate = new Date(deliveryDate);
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 15);
    selectedDate.setHours(0, 0, 0, 0);
    minDate.setHours(0, 0, 0, 0);

    const params = {
      order_id: cartListingItems?.name,
      party_name: partyName,
      reference_page: 'Cart',
      reference_id: 'cart',
    };

    if (selectedDate < minDate) {
      toast.error('Delivery date cannot be before 15 days from the transaction date.');
      setIsHandlePlaceOrderLoading(false); // Stop loader if validation fails
      return;
    }

    try {
      await placeOrderAPIFunc(params, setCartListingItems);
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsHandlePlaceOrderLoading(false); // Stop loader after API call
    }
  };

  const onEditwastage = (categoryIndex: number, orderIndex: number, data: string) => {
    const updatedItems = { ...cartListingItems };
    updatedItems.categories[categoryIndex].orders[orderIndex].wastage = data;
    setCartListingItems(updatedItems);
  };

  const handleClearCart = () => {
    cLearCartAPIFunc(quotation_Id);
    setCartListingItems([[]]);
  };

  const updateCartCust = async () => {
    if (isLoading) return; // Prevent multiple clicks

    if (customerName !== cartListingItems?.cust_name) {
      setCustomerNameUpdateLoading(true);
      try {
        await updateCartData(customerName, selectedPurity, setUpdatedPurity);
      } catch (error) {
        console.error('Error updating cart:', error);
      }
      setCustomerNameUpdateLoading(false);
    }
  };

  const handleUpdatePurity = async () => {
    if (isPurityUpdateLoading) return; // Prevent multiple clicks while loading
    setIsPurityUpdateLoading(true); // Start loader
    try {
      await updateCartData(customerName, selectedPurity, setUpdatedPurity);
    } finally {
      setIsPurityUpdateLoading(false); // Stop loader after API call
    }
  };

  const updatePurity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPurity(e.target.value);
  };

  const handleDataRendering = () => {
    if (isLoading) {
      return <CartSkeleton />;
    }
    if (cartListingItems?.categories?.length > 0) {
      return (
        <>
          <div className="border p-3">
            <div className="d-flex justify-content-md-between flex-column flex-md-row ">
              <div>
                <div className="d-flex">
                  <label className="col-6 col-sm-5 col-md-4 fw-bold">Customer Name: </label>

                  <input
                    type="text"
                    className="form-control form-control-sm "
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />

                  <button onClick={updateCartCust} className={`${styles.update_btn} btn btn-secondary py-0 ms-3`}>
                    {isCustomerNameUpdateLoading ? (
                      <span className="mx-3 ps-1">
                        <Spinner animation="border" size="sm" />
                      </span>
                    ) : (
                      <span>Update</span>
                    )}
                  </button>
                </div>
                <div className="mt-2 row">
                  <label className="col-6 col-sm-5 col-md-4 fw-bold">Order Purity:</label>

                  <span className=" col-6 col-sm-7 col-md-6">{updatedPurity}</span>
                </div>
                <div className="mt-2 d-flex">
                  <label className="col-6 col-sm-5 col-md-4 fw-bold">Update Purity:</label>
                  <select
                    className=" form-control form-control-sm "
                    // value={selectedPurity}
                    onChange={updatePurity}
                    placeholder="text"
                  >
                    {modifiedPurity.map((item: any, index: any) => {
                      if (!item) return null;
                      return (
                        <option key={index} value={item?.name}>
                          {item?.name}
                        </option>
                      );
                    })}
                  </select>

                  <button onClick={() => handleUpdatePurity()} className={`${styles.update_btn} btn btn-secondary py-0 ms-3`}>
                    {isPurityUpdateLoading ? (
                      <span className="mx-3 ps-1">
                        <Spinner animation="border" size="sm" />
                      </span>
                    ) : (
                      <span>Update</span>
                    )}
                  </button>
                </div>
                <div className="mt-2 d-flex">
                  <label className="col-6 col-sm-5 col-md-4 fw-bold">Delivery Date: </label>
                  <input
                    type="date"
                    className="form-control form-control-sm w-auto"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    min={deliveryDate}
                  />
                </div>
              </div>
              <div className={` mt-2 mt-md-0 d-flex justify-content-end`}>
                <button className={`${styles?.place_order_btn} m-0 me-md-2 `} onClick={handlePlaceOrder}>
                  {isHandlePlaceOrderLoading ? (
                    <span className="mx-4 px-2 ">
                      <Spinner animation="border" size="sm" />
                    </span>
                  ) : (
                    <span>Place Order</span>
                  )}
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
                  <div className={`row border py-2 bg-secondary bg-opacity-10 d-none d-lg-flex`}>
                    <div className="col-md-2 col-2 text-center"></div>
                    <div className="col-md-3 col-4 text-start">Products</div>
                    <div className="col-lg-2 col-md-2 col-12 text-center">Description</div>
                    <div className="col-lg-5 col-md-5 col-12"></div>
                  </div>
                  <div className="row border border-top-0">
                    {category?.orders?.length > 0 &&
                      category?.orders?.map((order: any, orderIndex: any) => (
                        <>
                          <div className={`col-lg-7  col-12 border-bottom border-top border-md-`}>
                            <CartProductDetail
                              data={order}
                              onEditWastage={(data: any) => onEditwastage(categoryIndex, orderIndex, data)}
                              handleEditWastage={handleUpdateListData}
                            />
                          </div>
                          <div className={`col-lg-4 col-11 p-0`}>
                            <SizeQtyTable
                              data={order}
                              onQtyChange={(sizeIndex: number, newQty: number, data: any) =>
                                handleQtyChange(categoryIndex, orderIndex, sizeIndex, newQty, data)
                              }
                              onDelete={handleDeleteRow}
                              // onDelete={(sizeIndex: number, data: any) => handleDeleteSize(categoryIndex, orderIndex, sizeIndex, data)}
                            />
                          </div>
                          <div className={`col-1 border-bottom border-left text-center d-flex justify-content-center align-items-center`}>
                            <button
                              className="btn btn-link text-decoration-none text-dark p-0"
                              onClick={() => {
                                handleDeleteRow(order?.item_code);
                              }}
                              disabled={disableRemove}
                            >
                              <RiDeleteBin7Fill />
                            </button>
                          </div>
                        </>
                      ))}
                  </div>
                </div>
              ))}
            <hr />
            <div className="d-flex justify-content-end">
              {/* <textarea className="w-50 p-3" rows={2} placeholder="Terms & Conditions"></textarea> */}
              <div className={`${styles.place_order_container}`}>
                <h3>Grand Total weight : {cartListingItems?.grand_total_weight}gm</h3>
                <div className="d-flex w-100 justify-content-end">
                  <button className={`${styles?.place_order_btn}`} onClick={handlePlaceOrder}>
                    {isHandlePlaceOrderLoading ? (
                      <span className="mx-4 px-2 ">
                        <Spinner animation="border" size="sm" />
                      </span>
                    ) : (
                      <span>Place Order</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="container-xl p-3">
            <div className="d-flex justify-content-end">
              <button
                className={`${styles.clear_cart_btn} me-2`}
                data-toggle="modal"
                data-target="#confirmationModal"
                onClick={handleShowClearCartModal}
              >
                Clear Cart
              </button>
            </div>
          </div>
          <ClearCartModal
            show={showClearCartModal}
            handleClose={handleCloseClearCartModal}
            onConfirmDelete={handleClearCart}
            title={'Clear Cart'}
            message={'Are you sure you want to clear the cart?'}
          />
        </>
      );
    }
    if (errorMessage !== '' && cartListingItems?.length <= 0 && isLoading === false) {
      return <ApiErrorPage />;
    }
    if (Object.keys(cartListingItems).length === 0 && cartListingItems.constructor === Object && errorMessage === '') {
      return <NoDataFound title="Cart list is empty !!" message="Add Items to cart to view cart list." />;
    }
  };
  return (
    <div className="container-xl">
      <h2 className="theme-blue text-center my-3">My Shopping Cart</h2>
      {handleDataRendering()}
    </div>
  );
};

export default CartListing;
