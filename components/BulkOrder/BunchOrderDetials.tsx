import React from 'react'
import styles from '../../styles/components/bulkOrder.module.scss'

const BunchOrderDetials = ({formData,errorMsg,
  addBunchOrderRow,
  deleteBunchOrderRow,
  handleChangeArray,
  isBunchWeightDisabled,}:any) => {
  return (
    <>
      <div className="row mt-4 mb-2">
        <div className="col-md-9">
          <p className="fs-14"><b>Bunch Orders Details</b></p>
        </div>
        <div className="col-md-3 d-flex justify-content-end">
          <button className={styles.add_more_btn} onClick={addBunchOrderRow} >
            Add More
          </button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered ">
          <thead>
            <tr>
              <th className={styles.table_header}>
                Design Name<span className="text-danger">*</span>
              </th>
              <th className={styles.table_header}>
                Description<span className="text-danger">*</span>
              </th>
              <th className={styles.table_header}>Bunch Weight</th>
              <th className={styles.table_header}>Bunch Length</th>
              <th className={styles.table_header}>Per Inch Weight / Length</th>
              <th className={styles.table_header}>Estimate Bunch Weight</th>
              <th className={styles.table_header}></th>
            </tr>
          </thead>
          <tbody>
            {formData?.bunchOrderDetails?.map((row: any, index: any) => (
              <tr key={index}>
                <td className="search-input-bulk-order">
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
                    keyBunch={"is_bunch"}
                    fetchItemDetails={fetchItemDetails}
                  /> */}
                </td>
                <td className='p-2'>
                  <input
                    type="text"
                    name={`description${index}`}
                    value={row?.description}
                    className={`form-control ${styles.table_desc}`}
                    onChange={(e) => handleChangeArray(e, index, "description")}
                  />
                </td>

                <td className='p-2'>
                  <input
                    type="text"
                    name={`bunch_weight${index}`}
                    value={!isNaN(row.bunch_weight) ? row.bunch_weight : ""}
                    className={`form-control ${styles.table_desc}`}
                    // onChange={(e) => handleBunchWeightChange(e, index)}
                    // readOnly={!!readOnlyBunchWeight[index]}
                  />
                </td>

                {row?.qty &&
                  row?.qty?.map((item: any, subIndex: number) => (
                    <React.Fragment key={subIndex}>
                      <td className='p-2'>
                        <input
                          type="number"
                          name={`size${index}`}
                          value={item?.size}
                          className={`form-control ${styles.table_desc}`}
                        //   onChange={(e) =>
                        //     handleBunchSizeChange(e, index, subIndex)
                        //   }
                          // disabled={!!disableBunchSize[index]}
                        />
                      </td>
                    </React.Fragment>
                  ))}

                <td className='p--2'>
                  <input
                    type="number"
                    name={`weight_per_unit${index}`}
                    value={row.weight_per_unit}
                    className={`form-control ${styles.table_desc}`}
                    onChange={(e) =>
                      handleChangeArray(e, index, "weight_per_unit")
                    }
                    disabled
                  />
                </td>
                <td className='p-2'>
                  <input
                    type="number"
                    className={`form-control ${styles.table_desc}`}
                    name={`estimate_bunch_weight${index}`}
                    value={
                      row?.bunch_weight === 0 || row?.bunch_weight === undefined
                        ? row?.bunch_weight
                        : row?.estimate_bunch_weight
                    }
                    onChange={(e) =>
                      handleChangeArray(e, index, "estimate_bunch_weight")
                    }
                    disabled
                  />
                </td>
                <td className="text-end p-2">
                  <button
                    className={styles.delete_btn}
                    onClick={() => deleteBunchOrderRow(index)}
                  >
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
          {/* {totalEstimateWeight !== 0 && (
            <tfoot>
              <tr className="text-start">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>Total : {totalEstimateWeight.toFixed(2)} gm</td>
              </tr>
            </tfoot>
          )} */}
        </table>
      </div>
    </>
  )
}

export default BunchOrderDetials