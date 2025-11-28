import React, { useState } from 'react';
import Image from 'next/image';
import { CONSTANTS } from '../services/config/app-config';
import noImage from '../public/assets/images/no_image.png';
import orderDetailStyles from '../styles/components/orderDetail.module.scss';
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap';

const modalFieldConfig: any = {
  Dispatch: [
    { name: 'dispatch_quantity', label: 'Dispatch Quantity', type: 'number' },
    { name: 'dispatch_weight', label: 'Dispatch Weight (gm)', type: 'number' },
  ],

  Repair: [
    { name: 'repair_quantity', label: 'Repair Quantity', type: 'number' },
    { name: 'repair_remark', label: 'Repair Remark', type: 'text' },
  ],

  Reject: [
    { name: 'rejected_quantity', label: 'Rejected Quantity', type: 'number' },
    { name: 'rejection_reason', label: 'Rejection Reason', type: 'text' },
  ],

  Complete: [
    { name: 'dispatch_quantity', label: 'Dispatch Quantity', type: 'number' },
    { name: 'dispatch_weight', label: 'Dispatch Weight (gm)', type: 'number' },
  ],
};

const OrderDetailCard = ({
  name,
  image,
  weight,
  level_2_category,
  net_weight,
  market_design_name,
  purity,
  order,
  note,
  totalWeight,
  totalDispatch,
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
  modalData,
  modalType,
  openModal,
  closeModal,
  handleModalInputChange,
  handleModalSubmit,
  buttonInfo,
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
          <div className="row ">
            <div className="col-7 text-center d-flex flex-column justify-content-center text-center">
              <div className="row align-items-center border">
                <div className="col-2 ">
                  <div className="img-wrap text-center" style={{ maxHeight: '110px' }}>
                    <Image
                      loader={imageLoader}
                      className={`d-block img-fluid`}
                      src={image !== null ? image : noImage}
                      alt="Barcode image"
                      priority
                      width={100}
                      height={100}
                    />
                  </div>
                </div>
                <div className="col-4 text-start">
                  <div className={`${orderDetailStyles.order_detail_block}`}>
                    <Image loader={imageLoader} src={barcodeimage} alt="Barcode image" priority width={180} height={70} />
                    <p className="mb-0">Product code:{name}</p>
                    {bom_factory_code !== null && <p>BOM Factory Code: {bom_factory_code}</p>}
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
                <div className={`col-1 ${orderDetailStyles.order_detail_block}`}>
                  <p>{purity}</p>
                </div>
                <div className="col-1 text-start">
                  {/* <p className="text-dark" style={{ fontSize: '14px' }}>
                    Wastage:-{wastage}
                  </p> */}
                  <p className="text-dark" style={{ fontSize: '14px' }}>
                    {note}
                  </p>
                </div>
                <div className="col-1">
                  <p className="text-dark" style={{ fontSize: '14px' }}>
                    {status}
                  </p>
                </div>
                {showButtons && ['pending', 'Accepted', 'WIP', 'Pending', 'accepted'].includes(status) && (
                  <div className="col-3 text-center">
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
            <div className="col-5 border p-0">
              <div className={`${orderDetailStyles.order_detail_table}`}>
                <table style={{ height: '100%' }}>
                  <tr className="text-nowrap text-md-wrap">
                    <th className="px-1">Color</th>
                    <th className="px-1">Size (Inch)</th>
                    <th className="px-1">Dispatch Qty</th>
                    <th className="px-1">Dispatch Wt</th>
                    <th className="px-1">Qty</th>
                    <th className="px-1">Weight (gm)</th>
                    <th className="px-1">status</th>
                    
                  </tr>
                  {order.length > 0 &&
                    order.map((data: any, index: any) => (
                      <tr key={index}>
                        <td className="px-1">{data.colour}</td>
                        <td className="px-1">{data.size} inch</td>
                        <td className="px-1">{data.dispatch_quantity}</td>
                        <td className="px-1">{data.dispatch_weight}</td>
                        <td className="px-1">{data.qty}</td>
                        <td className="text-right px-1">{data.weight.toFixed(2)}gm</td>
                        <td className="text-right px-1">{data?.custom_oms_status}</td>
                        {buttonInfo
                          .filter((btn: any) => btn.value)
                          .map((btn: any, index: number) => {
                            const { label } = btn;

                            const btnColorClass = label === 'Dispatch' || label === 'Complete' ? orderDetailStyles.greenBtn : '';

                            // ❌ Skip rendering ALL buttons for these statuses
                            if (
                              data?.custom_oms_status === 'Completed' ||
                              data?.custom_oms_status === 'Rejected' ||
                              data?.custom_oms_status === 'Repaired'
                            ) {
                              return null;
                            }

                            // ❌ For Dispatched status → hide ONLY the Dispatch button
                            if (data?.custom_oms_status === 'Dispatched' && label === 'Dispatch') {
                              return null;
                            }

                            return (
                              <td key={index} className="py-1">
                                <button
                                  className={`${orderDetailStyles.tableBtns} ${btnColorClass} mx-1`}
                                  onClick={() => openModal(label, data)}
                                >
                                  {label}
                                </button>
                              </td>
                            );
                          })}
                      </tr>
                    ))}
                  <tr>
                    <td style={{ fontSize: '10px !important' }} colSpan={2}>Total Weight:</td>
                    <td className="text-right" colSpan={3}>
                      {totalWeight.toFixed(2)} gm
                    </td>
                  </tr>
                  {totalDispatch ? (
                    <tr>
                      <td style={{ fontSize: '10px !important' }}>Total Dispatch Wt:</td>
                      <td className="text-right" colSpan={3}>
                        {totalDispatch?.toFixed(2)} gm
                      </td>
                    </tr>
                  ) : (
                    ''
                  )}

                  {issue_weight !== null && issue_weight !== '' && (
                    <tr>
                      <td style={{ fontSize: '10px !important' }}>Issue Weight:</td>
                      <td className="text-right" colSpan={3}>
                        {parseInt(issue_weight)} gm
                      </td>
                    </tr>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-12">
              <Modal show={!!modalType} onHide={closeModal} centered>
                <ModalHeader closeButton>
                  <ModalTitle>
                    <h5 className="mb-0">{modalType}</h5>
                  </ModalTitle>
                </ModalHeader>

                <ModalBody>
                  <div className="d-flex flex-wrap gap-3">
                    {modalFieldConfig[modalType]?.map((field: any) => (
                      <div key={field.name} style={{ minWidth: '45%' }}>
                        <label className="form-label fw-semibold" style={{ fontSize: '14px' }}>
                          {field.label}
                        </label>

                        <input
                          type={field.type}
                          name={field.name}
                          value={modalData[field.name] || ''}
                          onChange={handleModalInputChange}
                          className="form-control"
                        />
                      </div>
                    ))}
                  </div>
                </ModalBody>

                <ModalFooter>
                  <button className={`${orderDetailStyles.cancelBtn} ${orderDetailStyles.submitBtn}`} onClick={closeModal}>
                    Cancel
                  </button>

                  <button className={orderDetailStyles.submitBtn} onClick={handleModalSubmit}>
                    Submit
                  </button>
                </ModalFooter>
              </Modal>
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
      </div>
    </>
  );
};

export default OrderDetailCard;
