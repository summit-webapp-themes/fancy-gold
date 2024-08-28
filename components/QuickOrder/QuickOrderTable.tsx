import React from 'react';
import QuickOrderCard from './QuickOrderCard';

const QuickOrderTable = ({ quickOrderData, handleDltQuickOrderRecord }:any) => {
  return (
    <div className="container-lg pt-5">
      <div className="row">
        <div className="col-lg-10 mx-auto quick-order-table">
          <table className="table table-striped">
            <thead>
              <tr>
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
              {quickOrderData?.length > 0 &&
                quickOrderData.map((cardData:any, index:number) => (
                  <QuickOrderCard
                    quickOrderData={cardData}
                    index={index}
                    handleDltQuickOrderRecord={handleDltQuickOrderRecord}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QuickOrderTable;
