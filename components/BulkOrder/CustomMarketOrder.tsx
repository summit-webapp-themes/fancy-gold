import React, { useState } from 'react';
import styles from '../../styles/components/bulkOrder.module.scss';
import BulkDropdownInput from './BulkOrderDropdown';

const CustomMarketOrder = ({
  formData,
  errorMsg,
  addCustomMarketOrderRow,
  deleteCustomMarketOrderRow,
  handleChangeArray,
  refCodesList,
}: any) => {
  const [inputValues, setInputValues] = useState<string[]>([]);
  const handleInputValueChange = (value: string, index: number) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };
  return (
    <>
      <div className="row mt-4 mb-2">
        <div className="col-md-9">
          <p className="fs-14">
            <b>Custom Market Order Details</b>
          </p>
        </div>
        <div className="col-md-3 d-flex justify-content-end">
          <button className={styles.add_more_btn} onClick={addCustomMarketOrderRow}>
            Add More
          </button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table ">
          <thead>
            <tr>
              <th className={styles.table_header}>
                Design Name<span className="text-danger">*</span>
              </th>
              <th className={styles.table_header}>
                Description<span className="text-danger">*</span>
              </th>
              <th className={styles.table_header}>
                Inch Size<span className="text-danger">*</span>
              </th>
              <th className={styles.table_header}>
                Inch Qty<span className="text-danger">*</span>
              </th>
              <th className={styles.table_header}></th>
            </tr>
          </thead>
          <tbody>
            {formData?.customMarketOrderDetails?.map((row: any, index: any) => (
              <tr key={index}>
                <td className="search-input-bulk-order w-25">
                  <BulkDropdownInput
                    dropdownData={refCodesList?.map((ele: any) => ele?.reference_code)}
                    inputValue={inputValues[index] || ''}
                    setInputValue={(value: string) => handleInputValueChange(value, index)}
                    disabled={''}
                    name={`item_code${index}`}
                    onChange={(e: any) => handleChangeArray({ target: { value: e } }, index, 'item_code')}
                    refCodesList={refCodesList}

                  />
                </td>
                <td className="p-2">
                  <input
                    type="text"
                    name={`description${index}`}
                    className={`form-control ${styles.table_desc}`}
                    value={row.description}
                    onChange={(e) => handleChangeArray(e, index, 'description')}
                  />
                </td>
                <td className="p-2">
                  {row.qty.map((item: any, subIndex: number) => (
                    <React.Fragment key={subIndex}>
                      <input
                        type="number"
                        name={`size${index}.${subIndex}`}
                        value={item.size}
                        className={`form-control ${styles.table_desc}`}
                        onChange={(e) => handleChangeArray(e, index, 'size', subIndex)}
                      />
                    </React.Fragment>
                  ))}
                </td>
                <td className="p-2">
                  {row.qty.map((item: any, subIndex: number) => (
                    <React.Fragment key={subIndex}>
                      <input
                        type="number"
                        name={`qty${index}.${subIndex}`}
                        value={item.qty}
                        className={`form-control ${styles.table_desc}`}
                        onChange={(e) => handleChangeArray(e, index, 'qty', subIndex)}
                      />
                    </React.Fragment>
                  ))}
                </td>

                <td className="text-end">
                  <button className={styles.delete_btn} onClick={() => deleteCustomMarketOrderRow(index)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {errorMsg && (
              <tr>
                <td colSpan={5} className="w-100 text-danger text-center">
                  {errorMsg}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CustomMarketOrder;
