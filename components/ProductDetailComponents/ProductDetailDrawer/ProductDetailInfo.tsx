import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import productDetailStyles from '../../../styles/components/productDetail.module.scss';

const ProductDetailInfo = ({ data }: any) => {
  const cust_name = localStorage.getItem('cust_name');
  const initialState = {
    colour: '',
    size: '',
    qty: '',
  };
  const [sizeTable, setSizeTable] = useState([initialState]);
  const [cartProductsData, setCartProductsData] = useState({
    wastage: '',
    remark: '',
  });
  const handleAddRow = () => {
    setSizeTable([...sizeTable, initialState]);
  };
  const handleDeleteRow = (index: number) => {
    const updatedSizeTable = sizeTable.filter((_, i) => i !== index);
    setSizeTable(updatedSizeTable);
  };

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const updatedSizeTable = sizeTable.map((row, i) => (i === index ? { ...row, [name]: value } : row));
    setSizeTable(updatedSizeTable);
  };
  const handleSizeButtonClick = (size: number) => {
    if (sizeTable[sizeTable.length - 1]?.size) {
      const newRow = { ...initialState, size: size.toString() };
      setSizeTable([...sizeTable, newRow]);
    } else {
      const updatedSizeTable = sizeTable.map((row, i) => (i === sizeTable.length - 1 ? { ...row, size: size.toString() } : row));
      setSizeTable(updatedSizeTable);
    }
  };
  const handleRemarkChange = (event: any) => {
    const { name, value } = event.target;
    setCartProductsData({ ...cartProductsData, [name]: value });
  };
  const handleAddToCart = () => {
    const addToCartParams = {
      purity: data?.stock_uom,
      item_code: data?.name,
      colour: '',
      cust_name: cust_name,
      qty_size_list: sizeTable,
      remark: cartProductsData.remark,
      user: '',
      wastage: cartProductsData.wastage,
    };
    setCartProductsData({
      wastage: '',
      remark: '',
    });
    setSizeTable([initialState]);
    console.log(addToCartParams, 'cartProductsData');
  };
  return (
    <div className="w-100">
      <div className="py-2">
        This product is available in below sizes :
        <br />
        {[8.5, 22, 20, 8, 24].map((size, index) => (
          <button key={index} className={productDetailStyles.size_button} onClick={() => handleSizeButtonClick(size)}>
            {size}
          </button>
        ))}
        <button className="btn btn-link theme-blue" onClick={handleAddRow}>
          Add Custom Size
        </button>
      </div>
      <div className="mb-2">
        <div className="row mx-1">
          <div className="col-2 border text-center py-2">Purity</div>
          <div className="col-3 border text-center py-2">Colour</div>
          <div className="col-3 border text-center py-2">Size(inch)</div>
          <div className="col-3 border text-center py-2">Quantity</div>
          <div className="col border"></div>
        </div>
        {sizeTable.map((row, index) => (
          <div className="row mx-1" key={index}>
            <div className="col-2 border text-center fs-6 py-1">{data?.stock_uom}</div>
            <div className="col-3 border py-1">
              <select name="colour" value={row.colour} onChange={(e) => handleInputChange(index, e)} className="border-0 form-control p-0 text-center">
                <option value="Yellow">Yellow</option>
                <option value="Rose">Rose</option>
                <option value="White">White</option>
              </select>
            </div>
            <div className="col-3 border d-flex justify-content-center py-1">
              <input
                type="text"
                name="size"
                className={`${productDetailStyles.qty_input} form-control`}
                value={row.size}
                onChange={(e) => handleInputChange(index, e)}
              />
            </div>
            <div className="col-3 border d-flex justify-content-center py-1">
              <input
                type="text"
                name="qty"
                className={`${productDetailStyles.qty_input} form-control`}
                value={row.qty}
                onChange={(e) => handleInputChange(index, e)}
              />
            </div>
            <div className="col border p-1">
              <IoClose onClick={() => handleDeleteRow(index)} />
            </div>
          </div>
        ))}
      </div>
      <div className="">
        <textarea
          name="wastage"
          value={cartProductsData?.wastage}
          placeholder="wastage"
          className=" p-2 m-1 border w-50"
          onChange={(e) => handleRemarkChange(e)}
          rows={1}
        ></textarea>
        <textarea
          name="remark"
          value={cartProductsData?.remark}
          placeholder="Enter note"
          className=" p-2 m-1 border w-50"
          onChange={(e) => handleRemarkChange(e)}
        ></textarea>
      </div>
      <div className="d-flex justify-content-start my-2 me-5">
        <button className={productDetailStyles.add_to_cart_btn} onClick={handleAddToCart}>
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetailInfo;
