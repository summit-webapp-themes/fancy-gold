import React, { useState } from 'react';
import QuickOrderForm from './QuickOrderForm';
import QuickOrderTable from './QuickOrderTable';

const QuickOrderMaster = () => {
  const [quickOrderData, setQuickOrderData] = useState([]);

  const handleDltQuickOrderRecord = (id:any) => {
    const updatedRecord = quickOrderData.filter((_, index) => index !== id);
    setQuickOrderData(updatedRecord);
  };

  return (
    <div className="container my-3">
      <h2 className="theme-blue text-center my-3">Order by Design Name</h2>
      <QuickOrderForm setQuickOrderData={setQuickOrderData} quickOrderData={quickOrderData}/>
      {quickOrderData?.length > 0 && (
        <QuickOrderTable quickOrderData={quickOrderData} handleDltQuickOrderRecord={handleDltQuickOrderRecord} />
      )}
    </div>
  );
};

export default QuickOrderMaster;
