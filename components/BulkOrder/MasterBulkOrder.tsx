import React from 'react';
import BulkOrderInputFields from './BulkOrderInputFields';
import CustomeMarketOrder from './CustomeMarketOrder';
import MarketOrderTable from './MarketOrderTable';
import useBulkOrder from '../../hooks/BulkOrder/bulk-order-hook';
import { ToastNotification } from '../ToastNotificationNew';
import styles from '../../styles/components/_bulkOrder.module.scss';
import BunchOrderDetails from './BunchOrderDetails';

const MasterBulkOrder = () => {
  const {
    formData,
    handleChange,
    handleChangeMarketOrder,
    addMarketOrderRow,
    deleteMarketOrderRow,
    addCustomMarketOrderRow,
    addBunchOrderRow,
    deleteBunchOrderRow,
    deleteCustomMarketOrderRow,
    handleSaveBtn,
    itemList,
    itemListBunch,
    itemListCustom,
    handleChangeCustomOrder,
    handleChangeBunchOrder,
    purityValues,
    errorMsgMarket,
    errorMsgCustom,
    errorMsgBunch,
    totalEstimateWeight,
    fetchItemDetails,
    perInchWeight,
    perInchLengthSize,
    isBunchWeightDisabled,
  }: any = useBulkOrder();

  return (
    <>
      {/* <ToastNotification
        setShow={setBulkOrderNotification}
        show={bulkOrderNotification}
        content={notificationMessage}
      /> */}
      {/* <BulkOrderBreadCrumb /> */}

      <div className="container-lg mb-5 pb-5">
        <div className={styles.bulk_list_cont}>
          <div className="row mt-4">
            <div className="text-center">
              <h1>Bulk Order</h1>
            </div>
            <div className="">
              <BulkOrderInputFields formData={formData} handleChange={handleChange} purityList={purityValues} />
              <MarketOrderTable
                formData={formData}
                addMarketOrderRow={addMarketOrderRow}
                deleteMarketOrderRow={deleteMarketOrderRow}
                handleChangeMarketOrder={handleChangeMarketOrder}
                itemList={itemList}
                errorMsg={errorMsgMarket}
              />
              <CustomeMarketOrder
                formData={formData}
                addCustomMarketOrderRow={addCustomMarketOrderRow}
                handleChangeArrayCustom={handleChangeCustomOrder}
                deleteCustomMarketOrderRow={deleteCustomMarketOrderRow}
                itemListCustom={itemListCustom}
                errorMsg={errorMsgCustom}
              />
              <BunchOrderDetails
                formData={formData}
                addBunchOrderRow={addBunchOrderRow}
                handleChangeBunchOrder={handleChangeBunchOrder}
                itemList={itemListBunch}
                deleteBunchOrderRow={deleteBunchOrderRow}
                itemListBunch={itemListBunch}
                errorMsg={errorMsgBunch}
                totalEstimateWeight={totalEstimateWeight}
                fetchItemDetails={fetchItemDetails}
                perInchWeight={perInchWeight}
                perInchLengthSize={perInchLengthSize}
                isBunchWeightDisabled={isBunchWeightDisabled}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <button onClick={handleSaveBtn} className={styles.btn_save_bulk_order}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MasterBulkOrder;
