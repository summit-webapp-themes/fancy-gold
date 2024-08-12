import React, { useState } from 'react'
import styles from '../../styles/components/bulkOrder.module.scss'

const MarketOrderTable = ({formData}:any) => {
    
  return (
    <>
    <div className="row mt-4 mb-2">
      <div className="col-md-9">
        <p className=""><b>Market Order Details</b></p>
      </div>
      <div className="col-md-3 d-flex justify-content-end">
        <button className={styles.add_more_btn} > 
          Add More
        </button>
      </div>
    </div>
    <div className="table-responsive">
      <table className="table ">
        <thead >
          <tr >
            <th colSpan={1} className={styles.table_header}>
              Design<span className="name-th-pd">Name</span>
              <span className="text-danger p-0 m-0">*</span>
            </th>
            <th className={styles.table_header}>
              Description<span className="text-danger">*</span>
            </th>
            {[...Array(23)].map((_, i) => (
              <th key={i} className={styles.table_header}>{`${14 + i} Inch Qty`}</th>
            ))}
            <th className={styles.table_header}>1 Inch Qty</th>
            <th className={styles.table_header}></th>
          </tr>
        </thead>
        <tbody>
          {formData?.marketOrderDetails &&
            formData?.marketOrderDetails?.map((row: any, index: any) => (
              <tr className=''>
                <td  className="p-1">
                  {/* <BulkDropdownInput
                    dropdownData={refCodesList?.map(
                      (ele: any) => ele?.reference_code
                    )}
                    inputValue={inputValues[index] || ""}
                    setInputValue={(value: string) =>
                      handleInputValueChange(value, index)
                    }
                    disabled={""}
                    name={`item_code${index}`}
                    onChange={(e: any) =>
                      handleChangeArray(
                        { target: { value: e } },
                        index,
                        "item_code"
                      )
                    }
                  /> */}
                  <input className={`form-control ${styles.table_desc}`}/>
                </td>
                <td className='p-1'>
                  <input
                    type="text"
                    name={`description${index}`}
                    className={`form-control ${styles.table_desc}`}
                    value={row?.description}
                        // onChange={(e) =>
                        //   handleChangeArray(e, index, "description")
                        // }
                  />
                </td>
                {formData?.marketOrderDetails[index]?.qty.map(
                  (item: any, subIndex: number) => (
                    <td key={subIndex} className='p-1'>
                      <input
                        type="text"
                        name={`qty-${index}-${subIndex}`}
                        // value={item.qty}
                        className={`${styles.table_input} form-control`}
                        // onChange={(e) =>
                        //   handleChangeArray(e, index, "qty", subIndex)
                        // }
                      />
                    </td>
                  )
                )}
                <td className="p-1 text-end">
                  <button
                    className={`${styles.delete_btn}`}
                    // onClick={() => deleteAddMarketOrderRow(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

          {/* {errorMsg && (
            <tr>
              <td colSpan={25} className="w-100 text-danger text-center">
                {errorMsg}
              </td>
            </tr>
          )} */}
        </tbody>
      </table>
    </div>
  </>
  )
}

export default MarketOrderTable