import React, { useEffect, useState } from 'react';
import BulkDropdownInput from './BulkDropdown';
import useBulkOrder from '../../hooks/BulkOrder/bulk-order-hook';
import styles from '../../styles/components/_bulkOrder.module.scss';

const BunchOrderDetails = ({
  formData,
  addBunchOrderRow,
  handleChangeBunchOrder,
  deleteBunchOrderRow,
  itemListBunch,
  errorMsg,
  totalEstimateWeight,
  fetchItemDetails,
  perInchWeight,
  perInchLengthSize,
}: // isBunchWeightDisabled,
any) => {
  const { refCodesList }: any = useBulkOrder();

  const [inputValues, setInputValues] = useState<string[]>([]);
  const handleInputValueChange = (value: string, index: number) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  const [disableBunchSize, setDisableBunchSize] = useState<any>([]);
  const [readOnlyBunchWeight, setReadOnlyBunchWeight] = useState<any>([]);

  const handleBunchWeightChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    handleChangeBunchOrder(e, index, 'bunch_weight');
    setDisableBunchSize((prevValues: any) => {
      const newValues = [...prevValues];
      newValues[index] = value;
      return newValues;
    });
  };

  const handleBunchSizeChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, subIndex: number) => {
    const value = e.target.value;
    handleChangeBunchOrder(e, index, 'size', subIndex);
    setReadOnlyBunchWeight((prevValues: any) => {
      const newValues = [...prevValues];
      newValues[index] = !!value; // Make bunch weight read-only if size has value
      return newValues;
    });
  };

  return (
    <>
      <div className="row mt-3 mt-md-4">
        <div className="col-md-9">
          <p className="fs-14">Bunch Orders Details</p>
        </div>
        <div className="col-md-3 d-flex justify-content-end h-75">
          <button className={styles.btn_save_bulk_order} onClick={addBunchOrderRow}>
            Add More
          </button>
        </div>
      </div>
      <div className={styles.table_container}>
        <div className={styles.table_wrapper}>
          <table className="table table-bordered ">
            <thead className={styles.fixed_header}>
              <tr className=' text-nowrap'>
                <th className="">
                  Design Name<span className="text-danger">*</span>
                </th>
                <th>
                  Description<span className="text-danger">*</span>
                </th>
                <th>Bunch Weight</th>
                <th>Bunch Length</th>
                <th>Per Inch Weight / Length</th>
                <th>Estimate Bunch Weight</th>
                <th></th>
              </tr>
            </thead>
            <tbody style={{ position: 'relative' }}>
              {formData?.bunchOrderDetails?.map((row: any, index: any) => (
                <tr key={index}>
                  <td className={styles.search_input_bulk_order} style={{ position: 'relative' }}>
                    <BulkDropdownInput
                      dropdownData={refCodesList?.map((ele: any) => ele?.reference_code)}
                      inputValue={inputValues[index] || ''}
                      setInputValue={(value: string) => handleInputValueChange(value, index)}
                      disabled={''}
                      name={`item_code${index}`}
                      onChange={(e: any) => handleChangeBunchOrder({ target: { value: e } }, index, 'item_code')}
                      keyBunch={'is_bunch'}
                      fetchItemDetails={fetchItemDetails}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name={`description${index}`}
                      value={row?.description}
                      className={`${styles.input_type_number} w-100 px-1`}
                      onChange={(e) => handleChangeBunchOrder(e, index, 'description')}
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      name={`bunch_weight${index}`}
                      value={!isNaN(row.bunch_weight) ? row.bunch_weight : ''}
                      className={`${styles.input_type_number} w-100 px-1`}
                      onChange={(e) => handleBunchWeightChange(e, index)}
                      // readOnly={!!readOnlyBunchWeight[index]}
                    />
                  </td>

                  {row?.qty &&
                    row?.qty?.map((item: any, subIndex: number) => (
                      <React.Fragment key={subIndex}>
                        <td>
                          <input
                            type="number"
                            name={`size${index}`}
                            value={item?.size}
                            className={`w-100 ${styles.input_type_number}  px-1 `}
                            onChange={(e) => handleBunchSizeChange(e, index, subIndex)}
                            // disabled={!!disableBunchSize[index]}
                          />
                        </td>
                      </React.Fragment>
                    ))}

                  <td>
                    <input
                      type="number"
                      name={`weight_per_unit${index}`}
                      value={row.weight_per_unit}
                      className={`w-100 ${styles.input_type_number}  px-1`}
                      onChange={(e) => handleChangeBunchOrder(e, index, 'weight_per_unit')}
                      disabled
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className={`w-100 ${styles.input_type_number}  px-1`}
                      name={`estimate_bunch_weight${index}`}
                      value={row?.bunch_weight === 0 || row?.bunch_weight === undefined ? row?.bunch_weight : row?.estimate_bunch_weight}
                      onChange={(e) => handleChangeBunchOrder(e, index, 'estimate_bunch_weight')}
                      disabled
                    />
                  </td>
                  <td className="text-end">
                    <button className={styles.btn_delete_bulk_order} onClick={() => deleteBunchOrderRow(index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {errorMsg && (
                <tr>
                  <td colSpan={7} className="w-100 text-danger text-center">
                    {errorMsg}
                  </td>
                </tr>
              )}
            </tbody>
            {totalEstimateWeight !== 0 && (
              <tfoot>
                <tr className="text-start">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Total : {totalEstimateWeight?.toFixed(2)} gm</td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </>
  );
};

export default BunchOrderDetails;
