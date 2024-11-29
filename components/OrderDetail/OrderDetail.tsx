import React from 'react';
import { useRouter } from 'next/router';
import { FaPrint } from 'react-icons/fa';
import useOrderDetailHook from '../../hooks/OrderDetailHook/useOrderDetailHook';
import OrderDetailCard from '../../cards/OrderDetailCard';
import orderDetailStyles from '../../styles/components/orderDetail.module.scss';
import CartSkeleton from '../Cart/CartSkeleton';
import ApiErrorPage from '../ApiErrorPage';

const OrderDetail = () => {
  const { query } = useRouter();
  const { orderData, isLoading, errorMessage, handleReorder, handleCancelOrder, showButtons, handleReadyToDispatch, handleDeleteOrder } =
    useOrderDetailHook();

  const grandWeight = orderData.total_grand_weight;
  const common_comment = orderData.common_comment;
  const customerName = orderData.cust_name;

  const printPage = () => {
    window.print();
  };

  const handleDataRendering: any = () => {
    if (isLoading) {
      return (
        <div className="mt-5">
          <CartSkeleton />
        </div>
      );
    }

    if (Object?.keys(orderData)?.length > 0 && !isLoading) {
      return (
        <div className="container mt-3">
          <div className="container mt-4 mb-2" id="section-to-print">
            <div className={` ${orderDetailStyles.order_heading} text-center content-prev`}>
              <h2>Order</h2>
            </div>
            <div className="row">
              <div className="col-6 p-0">
                <div className={`${orderDetailStyles.order_block} `}>
                  <p className="cust-name">Customer Name : {orderData.cust_name}</p>
                </div>
              </div>
              <div className="col-6 text-end">
                <div className="d-flex justify-content-end align-items-center">
                  <div className="mx-2">
                    <button className={orderDetailStyles?.btn} onClick={() => handleReorder(orderData.cust_name)}>
                      Reorder
                    </button>
                  </div>
                  <div className="mx-2">
                    <button className={orderDetailStyles?.btn} onClick={handleCancelOrder}>
                      Cancel
                    </button>
                  </div>
                  <div className={`mx-2 ${orderDetailStyles.print_order} `}>
                    <FaPrint onClick={printPage} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-prev">
            {orderData.data?.length > 0 &&
              orderData.data.map((item: any) => (
                <div
                  className="container m-top content-prev"
                  style={{
                    marginTop: '5px',
                    pageBreakBefore: 'always',
                  }}
                >
                  <h2 className={`pt-4 ${orderDetailStyles.categoryLabel} `}>
                    {item.level_2_category} | Total Weight : {item.level_2_total_weight.toFixed(2)}
                  </h2>

                  <div className="row">
                    <div className="col-12">
                      <div className="row">
                        <div className="col-12">
                          <div className="row">
                            <div className="col-8">
                              <div className={`${orderDetailStyles.order_block} pb-2`}>
                                <p>Customer Name : {orderData?.cust_name}</p>
                                <p>Order Date: {item.transaction_date}</p>
                                <p>Order Id: {query?.orderId}</p>
                              </div>
                            </div>

                            {/* {toShowDispatchBtn(item.orders, query.orderId)} */}
                          </div>
                        </div>
                        <div className="col-12">
                          <div
                            className={`row black border content-prev ${orderDetailStyles.table_header}`}
                            style={{ width: 'calc(100% + 23px)' }}
                          >
                            <div className="col-7 border-bottom border-top p-0 col-bg">
                              <div className="row">
                                <div className="col-6 border-end text-center">Products</div>
                                <div className="col-1 border-end text-center ">Purity</div>
                                <div className="col-1  text-start">Note</div>
                                <div className="col-1  text-center">Status</div>
                                <div className="col-2"></div>
                              </div>
                            </div>
                            <div className="col-5 black border-top border-start border-bottom border-end p-0 col-bg"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {item.orders.map((ord: any, index: number) => {
                    return (
                      <OrderDetailCard
                        key={index + ord?.item_code}
                        name={ord?.item_code}
                        barcodeimage={ord?.bar_code_image}
                        bom_factory_code={ord?.bom_factory_code}
                        level_2_category={ord?.level_2_category}
                        net_weight={ord?.net_weight}
                        market_design_name={ord?.market_design_name}
                        image={ord?.image}
                        order={ord?.order}
                        weight={ord?.weight_abbr}
                        purity={ord?.purity}
                        remark={ord?.remark}
                        wastage={ord?.wastage}
                        totalWeight={ord?.total_weight}
                        status={ord.item_status}
                        // setReviewState={setReviewState}
                        // callAddReviewAPI={callAddReviewAPI}
                        customerName={orderData?.cust_name}
                        order_id={query?.orderId}
                        order_date={item?.transaction_date}
                        issue_weight={ord?.issue_weight}
                        review_value={ord?.review}
                        // getOrderStatusValueFromURL={getOrderStatusValueFromURL}
                        soisd_item={ord?.soisd_item}
                        showButtons={showButtons}
                        handleReadyToDispatch={handleReadyToDispatch}
                        handleDeleteOrder={handleDeleteOrder}
                        // callUpdateSalesOrderStatusAPI={callUpdateSalesOrderStatusAPI}
                        // reviewState={reviewState}
                      />
                    );
                  })}
                </div>
              ))}
          </div>

          <div className="container mb-4 content-prev">
            <div className="row border">
              <div className="col-6 text-start p-2">
                <h6 className={`mb-0 mt-2 ps-1 ${orderDetailStyles.order_detail_block}`}>Grand Total Weight: {grandWeight}gm</h6>
              </div>
              <div className="col-6 text-end">
                <h6 className={`mb-0 mt-2 ps-1 ${orderDetailStyles.order_detail_block}`}>{common_comment}</h6>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (errorMessage !== '' && Object?.keys(orderData)?.length === 0 && isLoading === false) {
      <ApiErrorPage />;
    }
  };

  return (
    <>
      <div className="container">{handleDataRendering()}</div>
    </>
  );
};

export default OrderDetail;
