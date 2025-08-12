import React, { useState } from 'react';
import Image from 'next/image';
import { CONSTANTS } from '../services/config/app-config';
import noImage from '../public/assets/images/no_image.png';
import orderDetailStyles from '../styles/components/orderDetail.module.scss';
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap';

const OrderDetailCard = ({
  name,
  image,
  weight,
  level_2_category,
  net_weight,
  market_design_name,
  purity,
  order,
  remark,
  totalWeight,
  totalDispatched,
  wastage,
  barcodeimage,
  bom_factory_code,
  status,
  setReviewState,
  callAddReviewAPI,
  callUpdateSalesOrderStatusAPI,
  customerName,
  order_id,
  order_date,
  issue_weight,
  review_value,
  getOrderStatusValueFromURL,
  soisd_item,
  reviewState,
  showButtons,
  handleReadyToDispatch,
  handleDeleteOrder,
}: any) => {
  const [reviewModalToggle, setReviewModalToggle] = useState<boolean>(false);
  const [errMsgforReviewSubmitBtn, setErrMsgforReviewSubmitBtn] = useState<boolean>(false);

  const showReviewModal = () => {
    setReviewModalToggle(!reviewModalToggle);
  };

  const imageLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
  };

  const handleReviewSubmitBtn: any = () => {
    if (Object.keys(reviewState)?.length > 0 || review_value !== null) {
      setErrMsgforReviewSubmitBtn(false);
      callAddReviewAPI(order_id, name, customerName, order_date);
      callUpdateSalesOrderStatusAPI(soisd_item);
      setReviewModalToggle(false);
    } else {
      setErrMsgforReviewSubmitBtn(true);
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      handleReviewSubmitBtn();
    }
  };
  return (
    <>
      <div className="content-prev">
        <div className="col-12">
          <div className="row border mx-0">
            <div className="col-md-6 border-end p-0 text-center">
              <div className="row m-0 ">
                <div className='col-sm-6 px-0 row m-0'>
                  <div className={`border-end text-center ${orderDetailStyles.table_header}`}>Products</div>
                  <div className="col-md-4">
                    <div className="img-wrap text-center position-relative my-1" style={{ height: '110px' }}>
                      <Image
                        loader={imageLoader}
                        className={`d-block w-100 object-fit-contain position-absolute`}
                        src={image !== null ? image : noImage}
                        alt="Product image"
                        priority
                        fill
                      // width={100}
                      // height={100}
                      />
                    </div>
                  </div>
                  <div className="col-md-8 text-start">
                    <div className={`${orderDetailStyles.order_detail_block}`}>
                      <Image loader={imageLoader} src={barcodeimage} alt="Barcode image" priority width={100} height={30} />
                      <p className="mb-0">Product code:{name}</p>
                      {bom_factory_code !== null && <p className="mb-0">BOM Factory Code: {bom_factory_code}</p>}
                      {level_2_category === 'BALL CHAINS' && <p>Market Design Name:- {market_design_name}</p>}
                      <p className="mb-0">Weight: {parseInt(weight)} gm</p>
                      {(level_2_category === 'MANGALSUTRA' || level_2_category === 'IMP PREMIUM') && (
                        <p className="mb-2">Net Wt. {parseInt(net_weight)}gm</p>
                      )}
                    </div>
                    {status === 'Pending For Confirmation' && getOrderStatusValueFromURL === null ? (
                      <div className="">
                        <div>
                          <button className={`mt-3 mb-3 ${orderDetailStyles.order_detail_review_btn}`} onClick={showReviewModal}>
                            Add Review
                          </button>
                        </div>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className={`col-sm-2 px-0 `}>
                  <div className={`border-end text-center ${orderDetailStyles.table_header}`}>Purity</div>
                  <p className='mb-0' style={{ fontSize: '14px' }}>{purity}</p>
                </div>
                {/* <div className="col-sm-1 px-0 text-start">
                  <div className={`text-center ${orderDetailStyles.table_header}`}>Note</div>
                  <p className="text-dark" style={{ fontSize: '14px' }}>
                    Wastage:-{wastage}
                  </p>
                  <p className="text-dark" style={{ fontSize: '14px' }}>
                    {remark}
                  </p>
                </div> */}
                <div className="col-sm-2 px-0">
                  <div className={`text-center ${orderDetailStyles.table_header}`}>Status</div>
                  <p className="text-dark mb-0" style={{ fontSize: '14px' }}>
                    {status}
                  </p>
                </div>
                <div className='col-sm-2 px-0'>
                  <div className={`text-center d-none d-sm-block ${orderDetailStyles.table_header}`}></div>
                  {showButtons && ['pending', 'Accepted', 'WIP', 'Pending', 'accepted'].includes(status) && (
                    <div className="text-center">
                      {[
                        {
                          label: 'Completed',
                          className: orderDetailStyles.readyToDispatch,
                          onClick: () => handleReadyToDispatch(name),
                        },
                        { label: 'Delete', className: orderDetailStyles.deletBtn, onClick: () => handleDeleteOrder(name) },
                      ].map(({ label, className, onClick }) => (
                        <div key={label} className="m-2">
                          <button className={className} onClick={onClick}>
                            {label}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-6 p-0">
              <div className={`text-center d-none d-md-block  ${orderDetailStyles.table_header}`}></div>
              <div className={`${orderDetailStyles.order_detail_table} overflow-x-auto`}>
                <table style={{ height: '100%' }}>
                  <tr className='text-nowrap text-md-wrap'>
                    <th className='px-1'>Color</th>
                    <th className='px-1'>Size (Inch)</th>
                    <th className='px-1'>Custom Size</th>
                    <th className='px-1'>Dispatch Qty</th>
                    <th className='px-1'>Dispatch Wt</th>
                    <th className='px-1'>Qty</th>
                    <th className='px-1'>Weight (gm)</th>
                    <th className='px-1'>status</th>
                  </tr>
                  {order.length > 0 &&
                    order.map((data: any, index: any) => {
                      return (
                        <tr key={index}>
                          <td className='px-1'>{data.colour}</td>
                          <td className='px-1'>{data.size} inch</td>
                          <td className='px-1'>{data?.is_custom_size}</td>
                          <td className='px-1'>{data.ready_quantity}</td>
                          <td className='px-1'>{data.dispatch_weight}</td>
                          <td className='px-1'>{data.qty}</td>
                          <td className="text-right px-1">{data?.weight?.toFixed(2)}gm</td>
                          <td className="text-right px-1">{data?.custom_oms_status}</td>
                        </tr >
                      );
                    })}
                  <tr>
                    <td style={{ fontSize: '10px !important' }}>Total Weight:</td>
                    <td className="text-right" colSpan={3}>
                      {totalWeight?.toFixed(2)} gm
                    </td>
                  </tr>
                  {
                    totalDispatched ?
                      <tr>
                        <td style={{ fontSize: '10px !important' }}>Total Dispatch Wt:</td>
                        <td className="text-right" colSpan={3}>
                          {totalDispatched?.toFixed(2)} gm
                        </td>
                      </tr> : ""
                  }


                  {
                    issue_weight !== null && issue_weight !== '' && (
                      <tr>
                        <td style={{ fontSize: '10px !important' }}>Issue Weight:</td>
                        <td className="text-right" colSpan={3}>
                          {parseInt(issue_weight)} gm
                        </td>
                      </tr>
                    )
                  }
                </table >
              </div >
            </div >
          </div >
        </div >

        <div className="container">
          <div className="row">
            <div className="col-12">
              <Modal show={reviewModalToggle} onHide={showReviewModal} contentClassName="modal" className="">
                <ModalHeader closeButton>
                  <ModalTitle>
                    <h2>Add Review for this Item</h2>
                  </ModalTitle>
                </ModalHeader>
                <ModalBody>
                  <div>
                    <textarea rows={10} cols={80} onChange={(e: any) => setReviewState(e.target.value)} onKeyDown={handleKeyDown}>
                      {review_value && review_value}
                    </textarea>
                  </div>
                </ModalBody>
                {errMsgforReviewSubmitBtn && <span className="text-danger ps-3">Please Add Review for this item</span>}
                <ModalFooter>
                  <button className="order_detail_review_btn" onClick={handleReviewSubmitBtn}>
                    Submit
                  </button>
                </ModalFooter>
              </Modal>
            </div>
          </div>
        </div>
      </div >
    </>
  );
};

export default OrderDetailCard;
