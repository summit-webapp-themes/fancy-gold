import React, { useState } from 'react';
import Image from 'next/image';
import { IoClose } from "react-icons/io5";
import productDetailStyles from '../../../styles/components/productDetail.module.scss'
import { CONSTANTS } from '../../../services/config/app-config';

const ProductDetailInfo = ({ data }: any) => {
  const initialState = {
    purity:'',
    colour:'',
    size:'',
    qty:''
  }
  const [sizeTable,setSizeTable]=useState([initialState])
  const handleAddRow =()=>{
    setSizeTable([...sizeTable,initialState])
  }
  const handleDeleteRow = (index: number) => {
    const updatedSizeTable = sizeTable.filter((_, i) => i !== index);
    setSizeTable(updatedSizeTable);
  };

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const updatedSizeTable = sizeTable.map((row, i) => 
      i === index ? { ...row, [name]: value } : row
    );
    setSizeTable(updatedSizeTable);
  };
  const handleSizeButtonClick = (size: number) => {
    if (sizeTable[sizeTable.length - 1]?.size) {
      const newRow = { ...initialState, size: size.toString() };
      setSizeTable([...sizeTable, newRow]);
    } else {
      const updatedSizeTable = sizeTable.map((row, i) => 
        i === sizeTable.length - 1 ? { ...row, size: size.toString() } : row
      );
      setSizeTable(updatedSizeTable);
    }
  };
  const addToCartParams = {}
  const imageLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <>
      <p>Product Code : {data?.name}
        <br />
      Gross weight : {Number(data?.weight_per_unit).toFixed(2)}gm</p>
      <div>
        This product is available in below sizes :
        <br />
        {[8.5, 22, 20, 8, 24].map((size, index) => (
          <button key={index} className={productDetailStyles.size_button} onClick={(e)=>handleSizeButtonClick(size)}>{size}</button>
        ))}
        <div className='d-flex justify-content-end'>

        <button className="btn btn-link" onClick={handleAddRow}>Add Custom Size</button>
        </div>
      </div>
      <div className="row">
        <div className="col-2 border">Purity</div>
        <div className="col-3 border">Colour</div>
        <div className="col-3 border">Size(inch)</div>
        <div className="col-3 border">Quantity</div>
        <div className="col border"></div>
      </div>
      {sizeTable.map((row, index) => (
        <div className="row" key={index}>
          <div className="col-2 border">
            <input 
              type="text" 
              name="purity" 
              value={data?.stock_uom} 
              onChange={(e) => handleInputChange(index, e)} 
              className={`${productDetailStyles.qty_input} form-control`} 
            />
          </div>
          <div className="col-3 border">
            <select 
              name="colour" 
              value={row.colour} 
              onChange={(e) => handleInputChange(index, e)} 
              className='border-0 form-control'>
              <option value="Yellow">Yellow</option>
              <option value="Rose">Rose</option>
              <option value="White">White</option>
            </select>
          </div>
          <div className="col-3 border">
            <input 
              type="text" 
              name="size" 
              value={row.size} 
              onChange={(e) => handleInputChange(index, e)} 
              className={`${productDetailStyles.qty_input} form-control`} 
            />
          </div>
          <div className="col-3 border p-0">
            <input 
              type="text" 
              name="qty" 
              value={row.qty} 
              onChange={(e) => handleInputChange(index, e)} 
              className={`${productDetailStyles.qty_input} form-control`} 
            />
          </div>
          <div className="col border px-1">
            
              <IoClose onClick={(e)=>handleDeleteRow(index)}/>
            
          </div>
        </div>
      ))}
      <div>

      <textarea name="" className='mt-2' placeholder='wastage' ></textarea>
      </div>
      <div>

      <textarea name="" id="" placeholder='Enter note'></textarea>
      </div>
      <div className='d-flex justify-content-end'>

        <button className={productDetailStyles.add_to_cart_btn} >Add To Cart</button>
        </div>
      <Image 
      loader={imageLoader}
      src={data?.image !== null && data?.image}
      alt="product image"
      width={200}
      height={200}
      />
    </>
  );
};

export default ProductDetailInfo;
