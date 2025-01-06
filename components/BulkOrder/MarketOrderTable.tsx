import React, { useState } from 'react';
import BulkDropdownInput from './BulkDropdown';
import styles from '../../styles/components/_bulkOrder.module.scss';
import useBulkOrder from '../../hooks/BulkOrder/bulk-order-hook';

const MarketOrderTable = ({ formData, addMarketOrderRow, handleChangeMarketOrder, deleteMarketOrderRow, errorMsg }: any) => {
  const { refCodesList }: any = useBulkOrder();
  const [inputValues, setInputValues] = useState<string[]>([]);

  const handleInputValueChange = (value: string, index: number) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  console.log({ formData });

  return (
    <>
      <div className="row mt-4 mb-0">
        <div className="col-md-9">
          <p className="fs-14">Market Order Details</p>
        </div>
        <div className="col-md-3 d-flex justify-content-end h-75">
          <button className={`${styles.btn_save_bulk_order}`} onClick={addMarketOrderRow}>
            Add More
          </button>
        </div>
      </div>
      <div className={styles.table_container}>
        <div className={styles.table_wrapper}>
          <table className="table table-bordered">
            <thead className={styles.fixed_header}>
              <tr>
                <th colSpan={1}>
                  Design<span className={styles.name_th_pd}>Name</span>
                  <span className="text-danger p-0 m-0">*</span>
                </th>
                <th>
                  Description<span className="text-danger">*</span>
                </th>
                {[...Array(22)].map((_, i) => (
                  <th key={i}>{`${14 + i} Inch Qty`}</th>
                ))}
                <th>1 Inch Qty</th>
                <th></th>
              </tr>
            </thead>
            <tbody style={{ position: 'relative' }}>
              {formData?.marketOrderDetails &&
                formData?.marketOrderDetails?.map((row: any, index: any) => (
                  <tr key={index}>
                    <td colSpan={1} className={`w-25 ${styles.search_input_bulk_order} `} style={{ position: 'relative' }}>
                      <BulkDropdownInput
                        dropdownData={refCodesList?.map((ele: any) => ele?.reference_code)}
                        inputValue={inputValues[index] || ''}
                        setInputValue={(value: string) => handleInputValueChange(value, index)}
                        disabled={''}
                        name={`item_code${index}`}
                        onChange={(e: any) => handleChangeMarketOrder({ target: { value: e } }, index, 'item_code')}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name={`description${index}`}
                        className={`${styles.input_type_number}  w-100 px-1`}
                        value={row?.description}
                        onChange={(e) => handleChangeMarketOrder(e, index, 'description')}
                      />
                    </td>
                    {formData?.marketOrderDetails[index]?.qty.map((item: any, subIndex: number) => (
                      <td key={subIndex}>
                        <input
                          name={`qty-${index}-${subIndex}`}
                          value={Number(item.qty) === 0 ? '' : Number(item.qty)}
                          className={`${styles.input_type_number}  w-100 px-1`}
                          onChange={(e) => handleChangeMarketOrder(e, index, 'qty', subIndex)}
                        />
                      </td>
                    ))}
                    <td className="text-end">
                      <button className={styles.btn_delete_bulk_order} onClick={() => deleteMarketOrderRow(index)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

              {errorMsg && (
                <tr>
                  <td colSpan={25} className="w-100 text-danger text-center">
                    {errorMsg}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MarketOrderTable;
