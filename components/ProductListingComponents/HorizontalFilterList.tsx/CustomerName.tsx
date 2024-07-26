import React, { useState } from 'react';
import horizontalFilterStyles from '../../../styles/components/horizontalFilter.module.scss';

const CustomerName = () => {
  const [customerName, setCustomerName] = useState('');
  const handleInput = (data: any) => {
    setCustomerName(data);
  };
  const handleLocalStorage=()=>{
    localStorage.setItem("cust_name", (customerName));
  }
  return (
    <div className="d-flex mx-2">
      <input
        type="text"
        className={`${horizontalFilterStyles.cust_name_input} form-control`}
        placeholder="Customer Name"
        aria-label="Customer Name"
        onChange={(e)=>handleInput(e.target.value)}
      />
      <div className="input-group-append">
        <button className={horizontalFilterStyles.save_btn} type="button" onClick={handleLocalStorage}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CustomerName;
