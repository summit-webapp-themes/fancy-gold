import React from 'react';
import useQuickOrder from '../../hooks/QuickOrder/quick-order-hook';
import Purity from '../ProductListingComponents/HorizontalFilterList.tsx/Purity';
import SearchableDropdown from '../SearchableDropdown';

const QuickOrderMaster = () => {
  const {
    handleSaveBtn,
    quickOrderData,
    handleInputChange,
    inputValue,
    setInputValue,
    qtySizeInput,
    handleSubmitBtn,
    handleDltQuickOrderRecord,
    customerName,
    handleCustomerName,
    refCodesList,
    disableInputField,
    QuickOrderNotification,
    setQuickOrderNotification,
    notificationMessage,
  }: any = useQuickOrder();
  return (
    <div className="container my-3">
      <h2 className="theme-blue text-center my-3">Order by Design Name</h2>

      <div className="text-center mt-5" style={{height:'40px'}}>
        <Purity />
      </div>
      <div className="mt-4 row justify-content-center">
        <div className="col-lg-10 col-12 mx-auto">
          <div className="row justify-content-center">
            <div className="col-lg-3 col-md-3 col-6">
              <input
                type="text"
                className="form-control"
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                value={customerName}
                placeholder="Customer Name"
                onChange={(e: any) => handleInputChange(e, 'customer_name')}
                onKeyDown={(e: any) => {
                  if (e.key === 'Enter') {
                    handleCustomerName();
                  }
                }}
              />
              <p style={{ fontSize: '12px', color: '#f00' }}>*Add customer name first and press Enter</p>
            </div>

            <div className="col-lg-3 col-md-3 col-6">
              <SearchableDropdown option={''} onSelect={''} />
            </div>

            <div className="col-lg-3 col-md-3 col-12 ">
              <input
                type="text"
                className="form-control"
                value={qtySizeInput}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSaveBtn();
                  }
                }}
                onChange={(e: any) => handleInputChange(e, 'qty_size')}
                disabled={disableInputField}
              />
            </div>

            <div className="col-lg-1 col-md-1 col-6 mt-lg-0 mt-2 text-center">
              <button type="button" className="btn btn-primary px-lg-4 px-md-2" onClick={handleSaveBtn}>
                Save
              </button>
            </div>
            <div className="col-lg-1 col-md-1 col-6 mt-lg-0 mt-2  text-center">
              <button type="button" className="btn btn-primary" onClick={handleSubmitBtn}>
                Submit
              </button>
            </div>
          </div>
        </div>

        {quickOrderData?.length > 0 && (
          <div className="container-lg pt-5">
            <div className="row ">
              <div className="col-lg-10 mx-auto quick-order-table">
                <table className="table table-striped">
                  <thead>
                    <tr className="">
                      <th scope="col" className="py-3 text-center">
                        Sr No
                      </th>
                      <th scope="col" className="py-3">
                        Design Name
                      </th>
                      <th scope="col" className="py-3">
                        <div className="row">
                          <div className="col-6">Size</div>
                          <div className="col-6">Qty</div>
                        </div>
                      </th>
                      <th scope="col" className="py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="border-0">
                    {/* {quickOrderData?.length > 0 &&
                      quickOrderData.map((cardData: any, index: any) => {
                        return (
                          <QuickOrderCard
                            quickOrderData={cardData}
                            index={index}
                            handleDltQuickOrderRecord={
                              handleDltQuickOrderRecord
                            }
                          />
                        );
                      })} */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickOrderMaster;
