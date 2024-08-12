import React, { useState } from 'react'
import BulkOrderInputFields from './BulkOrderInputFields'
import MarketOrderTable from './MarketOrderTable'
import CustomMarketOrder from './CustomMarketOrder';
import BunchOrderDetials from './BunchOrderDetials';
import styles from '../../styles/components/bulkOrder.module.scss'


const BulkOrderMaster = () => {
    const initialQty = () => Array.from({ length: 24 }, () => ({ qty: "", size: "" }));

const initialFormData = {
  purity: "",
  transaction_date: "",
  delivery_date: "",
  description: "",
  customer: "",
  company: "",
  currency: "",
  marketOrderDetails: [
    {
      item_code: "",
      description: "",
      uom: "",
      qty: initialQty(),
    },
  ],
  customMarketOrderDetails: [
    {
      item_code: "",
      qty: [{ qty: "", size: "" }],
      description: "",
      uom: "",
    },
  ],
  bunchOrderDetails: [
    {
      item_code: "",
      qty: [{ qty: "", size: "" }],
      description: "",
      uom: "",
      bunch_weight: "",
      weight_per_unit: "",
      estimate_bunch_weight: "",
      is_bunch: "",
    },
  ],
};

const [formData, setFormData] = useState<any>(initialFormData);
  return (
    <div className="container-lg mb-5 pb-5">
        <div className="bulk-list-cont">
          <div className="row mt-3">
            <div className="theme-blue text-center">
              <h1>Bulk Order</h1>
            </div>
            <div className="">
              <BulkOrderInputFields
                formData={formData}
                // handleChange={handleChange}
                // purityList={purityList}
              />
              <MarketOrderTable
                formData={formData}
                // addMarketOrderRow={addMarketOrderRow}
                // deleteAddMarketOrderRow={deleteAddMarketOrderRow}
                // handleChangeArray={handleChangeArray}
                // itemList={itemList}
                // errorMsg={errorMsgMarket}
              />
              <CustomMarketOrder
                formData={formData}
                // addCustomMarketOrderRow={addCustomMarketOrderRow}
                // handleChangeArray={handleChangeArrayCustom}
                // deleteCustomMarketOrderRow={deleteCustomMarketOrderRow}
                // itemListCustom={itemListCustom}
                // errorMsg={errorMsgCustom}
              />
              <BunchOrderDetials
                formData={formData}
                // addBunchOrderRow={addBunchOrderRow}
                // handleChangeArray={handleChangeArrayBunch}
                // itemList={itemListBunch}
                // deleteBunchOrderRow={deleteBunchOrderRow}
                // itemListBunch={itemListBunch}
                // errorMsg={errorMsgBunch}
                // totalEstimateWeight={totalEstimateWeight}
                // fetchItemDetails={fetchItemDetails}
                // perInchWeight={perInchWeight}
                // perInchLengthSize={perInchLengthSize}
                // isBunchWeightDisabled={isBunchWeightDisabled}
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
  )
}

export default BulkOrderMaster