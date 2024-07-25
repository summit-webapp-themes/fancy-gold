import React, { useState } from 'react';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';
import productDetailStyles from '../../../styles/components/productDetail.module.scss';
import { CONSTANTS } from '../../../services/config/app-config';

const ProductDetailInfo = ({ data }: any) => {
  const initialState = {
    purity: '',
    colour: '',
    size: '',
    qty: '',
  };
  const [sizeTable, setSizeTable] = useState([initialState]);
  const [cartProductsData, setCartProductsData] = useState([
    {
      wastage: '',
      remarks: '',
    },
  ]);
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
  const addToCartParams = {};
  const imageLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <>
      <div className="py-2">
        This product is available in below sizes :
        <br />
        {[8.5, 22, 20, 8, 24].map((size, index) => (
          <button key={index} className={productDetailStyles.size_button} onClick={(e) => handleSizeButtonClick(size)}>
            {size}
          </button>
        ))}
        {/* <div className='d-flex justify-content-end'> */}
        <button className="btn btn-link theme-blue" onClick={handleAddRow}>
          Add Custom Size
        </button>
        {/* </div> */}
      </div>
      <div className="row mx-1">
        <div className="col-2 border">Purity</div>
        <div className="col-3 border">Colour</div>
        <div className="col-3 border">Size(inch)</div>
        <div className="col-3 border">Quantity</div>
        <div className="col border"></div>
      </div>
      {sizeTable.map((row, index) => (
        <div className="row mx-1 mb-2" key={index}>
          <div className="col-2 border text-center">{data?.stock_uom}</div>
          <div className="col-3 border">
            <select name="colour" value={row.colour} onChange={(e) => handleInputChange(index, e)} className="border-0 form-control p-0 text-center">
              <option value="Yellow">Yellow</option>
              <option value="Rose">Rose</option>
              <option value="White">White</option>
            </select>
          </div>
          <div className="col-3 border d-flex justify-content-center">
            <input
              type="text"
              name="size"
              className={`${productDetailStyles.qty_input} form-control`}
              value={row.size}
              onChange={(e) => handleInputChange(index, e)}
            />
          </div>
          <div className="col-3 border d-flex justify-content-center">
            <input
              type="text"
              name="qty"
              className={`${productDetailStyles.qty_input} form-control`}
              value={row.qty}
              onChange={(e) => handleInputChange(index, e)}
            />
          </div>
          <div className="col border px-1">
            <IoClose onClick={(e) => handleDeleteRow(index)} />
          </div>
        </div>
      ))}
      <div>
        <textarea name="wastage" placeholder="wastage" onChange={(e) => handleRemarkChange(e)}></textarea>
      </div>
      <div>
        <textarea name="remarks" placeholder="Enter note" onChange={(e) => handleRemarkChange(e)}></textarea>
      </div>
      <div className="d-flex justify-content-end my-2">
        <button className={productDetailStyles.add_to_cart_btn}>Add To Cart</button>
      </div>
      <div className="d-flex justify-content-center">
        <Image loader={imageLoader} src={data?.image !== null && data?.image} alt="product image" width={400} height={350} />
      </div>
    </>
  );
};

export default ProductDetailInfo;
