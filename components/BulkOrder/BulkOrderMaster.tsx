import useBulkOrder from '../../hooks/BulkOrder/bulk-order-hook';
import styles from '../../styles/components/bulkOrder.module.scss';
import BulkOrderInputFields from './BulkOrderInputFields';
import BunchOrderDetials from './BunchOrderDetials';
import CustomMarketOrder from './CustomMarketOrder';
import MarketOrderTable from './MarketOrderTable';

const BulkOrderMaster = () => {
  const {
    formData,
    handleChange,
    purityValues,
    addMarketOrderRow,
    deleteMarketOrderRow,
    errMsgMarketOrder,
    handleChangeMarketOrder,
    refCodesList,
    errMsgCustomOrder,
    addCustomMarketOrderRow,
    deleteCustomMarketOrderRow,
    handleChangeCustomOrder,
    errMsgBuchOrder,
    addBunchOrderRow,
    deleteBunchOrderRow,
    handleChangeBunchOrder,
    isBunchWeightDisabled,
    fetchItemDetails,
    totalEstimateWeight
  } = useBulkOrder();
  return (
    <div className="container-lg mb-5 pb-5">
      <div className="bulk-list-cont">
        <div className="row mt-3">
          <div className="theme-blue text-center">
            <h1>Bulk Order</h1>
          </div>
          <div className="">
            <BulkOrderInputFields formData={formData} handleChange={handleChange} purityList={purityValues} />
            <MarketOrderTable
              formData={formData}
              addMarketOrderRow={addMarketOrderRow}
              deleteMarketOrderRow={deleteMarketOrderRow}
              handleChangeArray={handleChangeMarketOrder}
              errorMsg={errMsgMarketOrder}
              refCodesList={refCodesList}
            />
            <CustomMarketOrder
              formData={formData}
              addCustomMarketOrderRow={addCustomMarketOrderRow}
              handleChangeArray={handleChangeCustomOrder}
              deleteCustomMarketOrderRow={deleteCustomMarketOrderRow}
              errorMsg={errMsgCustomOrder}
              refCodesList={refCodesList}
            />
            <BunchOrderDetials
              formData={formData}
              addBunchOrderRow={addBunchOrderRow}
              handleChangeArray={handleChangeBunchOrder}
              deleteBunchOrderRow={deleteBunchOrderRow}
              errorMsg={errMsgBuchOrder}
              totalEstimateWeight={totalEstimateWeight}
              fetchItemDetails={fetchItemDetails}
              isBunchWeightDisabled={isBunchWeightDisabled}
              refCodesList={refCodesList}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <button
              // onClick={handleSubmit}
              className={styles.save_btn}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkOrderMaster;
