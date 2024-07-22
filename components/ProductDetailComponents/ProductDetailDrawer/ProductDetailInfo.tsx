import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

const ProductDetailInfo = ({ data }: any) => {
  console.log(data, 'productdata');
  return (
    <>
      <p>Product Code : {data?.name}
        <br />
      Gross weight : {Number(data?.weight_per_unit).toFixed(2)}gm</p>
      <div>
        This product is available in below sizes :
        <br />
        {[8.5, 22, 20, 8, 24].map((size, index) => (
          <button key={index} className="size-button">{size}</button>
        ))}
        <div className='d-flex justify-content-end'>

        <button className="btn btn-link">Add Custom Size</button>
        </div>
      </div>
      <div className="row">
        <div className="col-2 border">Purity</div>
        <div className="col-3 border">Colour</div>
        <div className="col-3 border">Size(inch)</div>
        <div className="col-3 border">Quantity</div>
        <div className="col border"></div>
      </div>
      <div className="row">
        <div className="col-2 border">{data?.stock_uom}</div>
        <div className="col-3 border">
          <select name="" className='border-0' >
            <option value="">Yellow</option>
            <option value="">Rose</option>
            <option value="">White</option>
          </select>
        </div>
        <div className="col-3 border">

          <input type="text" 
          className='qty-input form-control'/>
        </div>
        <div className="col-3 border p-0">
          <input type="text" 
          className='qty-input form-control'/>
        </div>
        <div className="col-1 border px-1">
          <CloseIcon/>
        </div>
      </div>
    </>
  );
};

export default ProductDetailInfo;
