import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import useAddToCartHook from '../../hooks/CartPageHook/useCartFunctions';
import useCartPageHook from '../../hooks/CartPageHook/useFetchCartItems';
import { selectCart } from '../../store/slices/cart-slices/cart-local-slice';
import styles from '../../styles/components/cartProductDetail.module.scss';
import { set } from 'react-ga';
import { Spinner } from 'react-bootstrap';
import ClearCartModal from './ClearCartModal';
const ApiErrorPage = dynamic(() => import('../ApiErrorPage'));
const CartSkeleton = dynamic(() => import('./CartSkeleton'));
const CartProductDetail = dynamic(() => import('./CartProductDetail'));
const SizeQtyTable = dynamic(() => import('./SizeQtyTable'));
const NoDataFound = dynamic(() => import('../NoDataFound'));

const CartListing = () => {
  const { cartListingItems, setCartListingItems, isLoading, errorMessage, purity, fetchCartListingData } = useCartPageHook();
  const { addToCartItem, placeOrderAPIFunc, RemoveItemCartAPIFunc, disableRemove, cLearCartAPIFunc, updateCartData } = useAddToCartHook();
  const [updatedPurity, setUpdatedPurity] = useState('');
  const [selectedPurity, setSelectedPurity] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [isCustomerNameUpdateLoading, setCustomerNameUpdateLoading] = useState(false);
  const [isHandlePlaceOrderLoading, setIsHandlePlaceOrderLoading] = useState(false);
  const [modifiedPurity, setModifiedPurity] = useState<any>([]);
  const [isPurityUpdateLoading, setIsPurityUpdateLoading] = useState(false);
  const { quotation_Id } = useSelector(selectCart);
  const user = localStorage.getItem('user');
  const partyName = localStorage.getItem('party_name');
  const [selectedColor, setSelectedColor] = useState('');
  const [updatedColor, setUpdatedColor] = useState('');
  const [colorList, setColorList] = useState<any>(['Yellow', 'White', 'Pink']);
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

  useEffect(() => {
    if (cartListingItems?.colour) {
      const colorOfItems: string = cartListingItems.colour;
      if (colorOfItems) {
        setUpdatedColor(colorOfItems);
        const updatedColors: any = [colorOfItems, ...colorList.filter((c: string) => c !== colorOfItems)];
        setColorList(updatedColors);
      } else {
        console.warn('Colour value is missing in the first order item.');
      }
    } else {
      console.warn('Order data is incomplete or missing.');
    }
  }, [cartListingItems]);

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
  // const handlePlaceOrder = async () => {
  //   const selectedDate = new Date(deliveryDate);
  //   const minDate = new Date();
  //   minDate.setDate(minDate.getDate() + 15);
  //   selectedDate.setHours(0, 0, 0, 0);
  //   minDate.setHours(0, 0, 0, 0);
  //   const params = {
  //     order_id: cartListingItems?.name,
  //     party_name: partyName,
  //   };
  //   if (selectedDate < minDate) {
  //     toast.error('Delivery date cannot be before 15 days from the transaction date.');
  //   } else {
  //     placeOrderAPIFunc(params, setCartListingItems);
  //   }
  // };


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

  const updateCartCust = () => {
    setCustomerNameUpdateLoading(true);
    try {
      if (customerName !== cartListingItems?.cust_name) {
        updateCartData(customerName, selectedPurity, selectedColor, setUpdatedPurity, setUpdatedColor);
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    } finally {
      setCustomerNameUpdateLoading(false);
    }
  };

  const handleUpdatePurity = async () => {
    if (isPurityUpdateLoading) return; // Prevent multiple clicks while loading
    setIsPurityUpdateLoading(true); // Start loader
    try {
      await updateCartData(customerName, selectedPurity, selectedColor, setUpdatedPurity, setUpdatedColor);
    } finally {
      setIsPurityUpdateLoading(false); // Stop loader after API call
    }
  };

  const updatePurity =(e: React.ChangeEvent<HTMLSelectElement>)=>{
    setSelectedPurity(e.target.value)
  }

  const updateColor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColor(e.target.value);
  };

  const updateColorButtonClick = async () => {
    const update = await updateCartData(customerName, selectedPurity, selectedColor, setUpdatedPurity, setUpdatedColor);
    if (update) {
      fetchCartListingData();
    }
  };

  // const handleDataRendering = () => {
  //   if (isLoading) {
  //     return <CartSkeleton />;
  //   }
  //   if (cartListingItems?.categories?.length > 0) {
  //     return (
  //       <>
  //         <div className="border p-3">
  //           <div className="d-flex justify-content-between">
  //             <div>
  //               <div className="mt-2 row">
  //                 <label className="col-md-4">Customer Name: </label>

  //                 <input type="text" className="col-md-5" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
  //                 <div className="col-md-1"></div>
  //                 <button onClick={updateCartCust} className={`${styles.update_btn} col-md-2`}>
  //                   Update
  //                 </button>
  //               </div>
  //               <div className="mt-2 row">
  //                 <label className="col-md-4">Order Purity:</label>

  //                 <span className="col-md-8">{updatedPurity}</span>
  //               </div>
  //               <div className="mt-2 row">
  //                 <label className="col-md-4">Update Purity:</label>
  //                 <select
  //                   className=" col-md-5"
  //                   // value={selectedPurity}
  //                   onChange={updatePurity}
  //                   placeholder="text"
  //                 >
  //                   {modifiedPurity.map((item: any, index: any) => {
  //                     if (!item) return null;
  //                     return (
  //                       <option key={index} value={item?.name}>
  //                         {item?.name}
  //                       </option>
  //                     );
  //                   })}
  //                 </select>
  //                 <div className="col-md-1"></div>
  //                 <button
  //                   onClick={() => updateCartData(customerName, selectedPurity, selectedColor, setUpdatedPurity, setUpdatedColor)}
  //                   className={`col-md-2 ${styles.update_btn}`}
  //                 >
  //                   Update
  //                 </button>
  //               </div>
  //               <div className="mt-2 row">
  //                 <label className="col-md-4">Delivery Date: </label>
  //                 <input
  //                   type="date"
  //                   className="col-md-5"
  //                   value={deliveryDate}
  //                   onChange={(e) => setDeliveryDate(e.target.value)}
  //                   min={deliveryDate}
  //                 />
  //               </div>
  //               <div className="mt-2 mx-0 row" style={{ minHeight: '32px' }}>
  //                 <label className="col-sm-4 col-lg-3 px-0 px-lg-3">Colour:</label>

  //                 <span className="col-sm-8 col-lg-9 px-0">{updatedColor}</span>
  //               </div>
  //               <div className="mt-2 mx-0 row">
  //                 <label className="col-sm-4 col-lg-3 px-0 px-lg-3">Update Colour:</label>
  //                 <div className="col-sm-4 col-lg-3 px-0">
  //                   <select
  //                     className=" form-control form-control-sm"
  //                     // value={selectedPurity}
  //                     onChange={updateColor}
  //                     placeholder="text"
  //                     style={{ maxWidth: '220px' }}
  //                   >
  //                     {colorList.map((item: any, index: any) => {
  //                       return (
  //                         <option key={index} value={item}>
  //                           {item}
  //                         </option>
  //                       );
  //                     })}
  //                   </select>
  //                 </div>
  //                 <div className="col-sm-4 d-flex justify-content-lg-end px-0 px-sm-4 px-md-0">
  //                   <button onClick={() => updateColorButtonClick()} className={`${styles.update_btn} btn btn-secondary py-0 mt-2 mt-sm-0`}>
  //                     <span>Update</span>
  //                   </button>
  //                 </div>
  //               </div>
  //             </div>
  //             <div className={`${styles.place_order_container}`}>
  //               <button className={`${styles?.place_order_btn}`} onClick={handlePlaceOrder}>
  //                 Place Order
  //               </button>
  //             </div>
  //           </div>
  //           <hr className="mt-3" />
  //           {cartListingItems?.categories?.length > 0 &&
  //             cartListingItems?.categories?.map((category: any, categoryIndex: number) => (
  //               <div className="p-3" key={categoryIndex}>
  //                 <h5 className="py-2">
  //                   {category?.category} | Total Weight: {category?.total_weight}gm
  //                 </h5>
  //                 <div className={`row ${styles?.table_header}`}>
  //                   <div className="col-lg-5 col-md-5 col-12 text-center">Products</div>
  //                   <div className="col-lg-2 col-md-2 col-12 text-center">Description</div>
  //                   <div className="col-lg-5 col-md-5 col-12"></div>
  //                 </div>
  //                 <div className="row">
  //                   {category?.orders?.length > 0 &&
  //                     category?.orders?.map((order: any, orderIndex: any) => (
  //                       <>
  //                         <div className={`col-lg-7 col-md-6 col-12 ${styles.border}`}>
  //                           <CartProductDetail
  //                             data={order}
  //                             onEditWastage={(data: any) => onEditwastage(categoryIndex, orderIndex, data)}
  //                             handleEditWastage={handleUpdateListData}
  //                           />
  //                         </div>
  //                         <div className={`col-lg-4 col-md-5 col-12 ${styles.border}`}>
  //                           <SizeQtyTable
  //                             data={order}
  //                             onQtyChange={(sizeIndex: number, newQty: number, data: any) =>
  //                               handleQtyChange(categoryIndex, orderIndex, sizeIndex, newQty, data)
  //                             }
  //                             onDelete={handleDeleteRow}
  //                             // onDelete={(sizeIndex: number, data: any) => handleDeleteSize(categoryIndex, orderIndex, sizeIndex, data)}
  //                           />
  //                         </div>
  //                         <div className={`col-lg-1 col-md-1 col-12 ${styles.cross_icon_container}`}>
  //                           <button
  //                             className="btn btn-link text-decoration-none text-dark"
  //                             onClick={() => {
  //                               handleDeleteRow(order?.item_code);
  //                             }}
  //                             disabled={disableRemove}
  //                           >
  //                             <RxCross2 />
  //                           </button>
  //                         </div>
  //                       </>
  //                     ))}
  //                 </div>
  //               </div>
  //             ))}
  //           <hr />
  //           <div className="d-flex justify-content-between">
  //             <textarea className="w-50 p-3" rows={2} placeholder="Terms & Conditions"></textarea>
  //             <div className={`${styles.place_order_container}`}>
  //               <h3>Grand Total weight : {cartListingItems?.grand_total_weight}gm</h3>
  //               <div className="d-flex justify-content-end w-100">
  //                 <button className={`${styles?.place_order_btn}`} onClick={handlePlaceOrder}>
  //                   Place Order
  //                 </button>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //         <div className="container p-2">
  //           <div className="row my-2 w-100 p-0 text-center">
  //             <div className="offset-6 col-md-6 col-6 text-end p-lg-0">
  //               <button
  //                 className={`${styles.clear_cart_btn}`}
  //                 data-toggle="modal"
  //                 data-target="#confirmationModal"
  //                 onClick={handleClearCart}
  //               >
  //                 Clear Cart
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       </>
  //     );
  //   }
  //   if (errorMessage !== '' && cartListingItems?.length <= 0 && isLoading === false) {
  //     return <ApiErrorPage />;
  //   }
  //   if (Object.keys(cartListingItems).length === 0 && cartListingItems.constructor === Object && errorMessage === '') {
  //     return <NoDataFound title="Cart list is empty !!" message="Add Items to cart to view cart list." />;
  //   }
  // };

  const handleDataRendering = () => {
    if (isLoading) {
      return <CartSkeleton />;
    }
    if (cartListingItems?.categories?.length > 0) {
      return (
        <>
          <div className="border p-3">
            <div className="row mx-0">
              <div className="col-lg-10 px-0">
                <div className="mt-2 mx-0 row">
                  <label className="col-sm-4 col-lg-3 px-0 px-lg-3">Customer Name: </label>
                  <div className=" col-sm-4 col-lg-3 px-0">
                    <input
                      type="text"
                      className="form-control form-control-sm col-sm-4 col-lg-3"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      style={{ maxWidth: '220px' }}
                    />
                  </div>
                  <div className="col-sm-4 d-flex justify-content-lg-end px-0 px-sm-4 px-md-0">
                    <button onClick={updateCartCust} className={`${styles.update_btn} btn btn-secondary py-0 mt-2 mt-sm-0 `}>
                      {isCustomerNameUpdateLoading ? (
                        <span className="mx-3 ps-1">
                          <Spinner animation="border" size="sm" />
                        </span>
                      ) : (
                        <span>Update</span>
                      )}
                    </button>
                  </div>
                </div>
                <div className="mt-2 mx-0 row" style={{ minHeight: '32px' }}>
                  <label className="col-sm-4 col-lg-3 px-0 px-lg-3">Order Purity:</label>

                  <span className="col-sm-8 col-lg-9 px-0">{updatedPurity}</span>
                </div>
                <div className="mt-2 mx-0 row">
                  <label className="col-sm-4 col-lg-3 px-0 px-lg-3">Update Purity:</label>
                  <div className="col-sm-4 col-lg-3 px-0">
                    <select
                      className=" form-control form-control-sm"
                      // value={selectedPurity}
                      onChange={updatePurity}
                      placeholder="text"
                      style={{ maxWidth: '220px' }}
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
                  </div>
                  <div className="col-sm-4 d-flex justify-content-lg-end px-0 px-sm-4 px-md-0">
                    <button onClick={() => handleUpdatePurity()} className={`${styles.update_btn} btn btn-secondary py-0 mt-2 mt-sm-0`}>
                      {isPurityUpdateLoading ? (
                        <span className="mx-3">
                          <Spinner animation="border" size="sm" />
                        </span>
                      ) : (
                        <span>Update</span>
                      )}
                    </button>
                  </div>
                </div>
                <div className="mt-2 mx-0 row">
                  <label className="col-sm-4 col-lg-3 px-0 px-lg-3">Delivery Date: </label>
                  <div className="col-sm-8 px-0">
                    <input
                      type="date"
                      className="form-control form-control-sm w-auto "
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      min={deliveryDate}
                    />
                  </div>
                </div>
                <div className="mt-2 mx-0 row" style={{ minHeight: '32px' }}>
                  <label className="col-sm-4 col-lg-3 px-0 px-lg-3">Colour:</label>

                  <span className="col-sm-8 col-lg-9 px-0">{updatedColor}</span>
                </div>
                <div className="mt-2 mx-0 row">
                  <label className="col-sm-4 col-lg-3 px-0 px-lg-3">Update Colour:</label>
                  <div className="col-sm-4 col-lg-3 px-0">
                    <select
                      className=" form-control form-control-sm"
                      // value={selectedPurity}
                      onChange={updateColor}
                      placeholder="text"
                      style={{ maxWidth: '220px' }}
                    >
                      {colorList.map((item: any, index: any) => {
                        return (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col-sm-4 d-flex justify-content-lg-end px-0 px-sm-4 px-md-0">
                    <button onClick={() => updateColorButtonClick()} className={`${styles.update_btn} btn btn-secondary py-0 mt-2 mt-sm-0`}>
                      <span>Update</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className={`${styles.place_order_container} col-lg-2 mt-3 mt-lg-0`}>
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
            <hr className="mt-3" />
            {cartListingItems?.categories?.length > 0 &&
              cartListingItems?.categories?.map((category: any, categoryIndex: number) => (
                <div className="p-0 p-md-3" key={categoryIndex}>
                  <h5 className="py-2">
                    {category?.category} | Total Weight: {category?.total_weight}gm
                  </h5>
                  <div className={`row border py-2 bg-secondary bg-opacity-10 mx-0`}>
                    <div className="col-4 col-lg-3 col-4 text-start">Products</div>
                    <div className="col-md-2 col-2 text-center"></div>
                    <div className="col-lg-2 col-md-2 col-12 text-start d-none d-lg-block">Description</div>
                    <div className="col-lg-5 col-md-5 col-12"></div>
                  </div>
                  <div className="border border-top-0">
                    {category?.orders?.length > 0 &&
                      category?.orders?.map((order: any, orderIndex: any) => (
                        <div key={orderIndex} className="row col-12 mx-0 border-bottom">
                          <div className={`col-md-6 col-lg-7 col-12 border-end`}>
                            <CartProductDetail
                              data={order}
                              onEditWastage={(data: any) => onEditwastage(categoryIndex, orderIndex, data)}
                              handleEditWastage={handleUpdateListData}
                            />
                          </div>
                          <div className={`col-md-5 col-lg-4 col-12 p-0 border-end`}>
                            <SizeQtyTable
                              data={order}
                              onQtyChange={(sizeIndex: number, newQty: number, data: any) =>
                                handleQtyChange(categoryIndex, orderIndex, sizeIndex, newQty, data)
                              }
                              onDelete={handleDeleteRow}
                              // onDelete={(sizeIndex: number, data: any) => handleDeleteSize(categoryIndex, orderIndex, sizeIndex, data)}
                            />
                          </div>
                          <div className={`col-md-1 text-center d-flex py-2 justify-content-center align-items-center`}>
                            <button
                              className="btn btn-link text-decoration-none text-dark p-0 d-flex justify-content-center"
                              onClick={() => {
                                handleDeleteRow(order?.item_code);
                              }}
                              disabled={disableRemove}
                            >
                              <RiDeleteBin7Fill />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            <hr />
            <div className="row m-0">
              {/* <textarea className="col-md-6 p-3" rows={2} placeholder="Terms & Conditions"></textarea> */}
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
          <div className="container-lg p-3">
            <div className="flex justify-content-end my-2 w-100 p-0 text-center">
              <div className="text-end">
                <button
                  className={`${styles.clear_cart_btn}`}
                  data-toggle="modal"
                  data-target="#confirmationModal"
                  onClick={handleShowClearCartModal}
                >
                  Clear Cart
                </button>
              </div>
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
    <div className="container">
      <h2 className="theme-blue text-center my-3">My Shopping Cart</h2>
      {handleDataRendering()}
    </div>
  );
};

export default CartListing;
