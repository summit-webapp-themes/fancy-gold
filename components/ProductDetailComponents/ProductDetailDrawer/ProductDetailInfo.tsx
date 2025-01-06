import React, { useState, useRef } from 'react';
import { IoClose } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { CONSTANTS } from '../../../services/config/app-config';
import { callPostAPI } from '../../../utils/http-methods';
import useAddToCartHook from '../../../hooks/CartPageHook/useCartFunctions';
import { selectCart } from '../../../store/slices/cart-slices/cart-local-slice';
import { get_access_token } from '../../../store/slices/auth/token-login-slice';
import productDetailStyles from '../../../styles/components/productDetail.module.scss';
import styles from '../../../styles/components/productCard.module.scss';

const ProductDetailInfo = ({ data, getProductDetailData }: any) => {
  const cartList = useSelector(selectCart)?.items;
  const TokenFromStore: any = useSelector(get_access_token);
  const { addToCartItem } = useAddToCartHook();
  const cust_name = localStorage.getItem('cust_name');
  const colour: any = localStorage.getItem('colour');
  const user = localStorage.getItem('user');
  const party_name = localStorage.getItem('party_name');
  const purity = localStorage.getItem('localPurity');
  const initialState: any = {
    colour: colour,
    size: '',
    weight: '',
    quantity: '',
    remark: '',
  };

  const [sizeTable, setSizeTable] = useState([initialState]);
  const [cartProductsData, setCartProductsData] = useState({
    wastage: '',
    remark: '',
    rejection_note: '',
  });
  const [errors, setErrors] = useState<{ [key: number]: { size?: string; quantity?: string } }>({});
  const [reject, setReject] = useState(false);
  const idxRef = useRef<number | null>(null);

  const handleAddRow = () => {
    setSizeTable([...sizeTable, initialState]);
  };

  const handleDeleteRow = (index: number) => {
    const updatedSizeTable = sizeTable.filter((_, i) => i !== index);
    setSizeTable(updatedSizeTable);
  };
  // const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
  //   const { name, value } = event.target;
  //   const updatedSizeTable = sizeTable.map((row, i) => (i === index ? { ...row, [name]: value } : row));
  //   setSizeTable(updatedSizeTable);
  // };
  const handleInputChange = (index: number, event: any) => {
    idxRef.current = index;
    const { name, value } = event.target;
    const updatedSizeTable = sizeTable.map((row, i) => {
      if (i === index) {
        const updatedRow = { ...row, [name]: value };
        if (name === 'size') {
          updatedRow.weight = ((data?.weight_per_unit / parseFloat(data?.length)) * value).toFixed(2);
        }

        return updatedRow;
      }
      return row;
    });

    setSizeTable(updatedSizeTable);
  };

  const handleAddToCart = () => {
    const newErrors: { [key: number]: { size?: string; quantity?: string } } = {};
    let valid = true;

    sizeTable.forEach((row, index) => {
      if (!row.size) {
        newErrors[index] = { ...newErrors[index], size: 'Size is required' };
        valid = false;
      }
      if (!row.quantity) {
        newErrors[index] = { ...newErrors[index], quantity: 'Quantity is required' };
        valid = false;
      }
    });

    setErrors(newErrors);

    if (!valid) {
      return;
    }

    const addToCartParams = {
      item_code: data?.name,
      party_name: party_name,
      purity: purity,
      cust_name: cust_name,
      colour: colour,
      wastage: cartProductsData.wastage,
      qty_size_list: sizeTable,
      remark: cartProductsData.remark,
      user: user,
    };
    if (cust_name !== '' && cust_name !== null) {
      addToCartItem(addToCartParams);
    } else {
      toast.error('Customer name is empty!');
    }
  };
  return (
    <div className="w-100">
      <div className="py-2">
        <h6 className={`${styles.productCode} fw-bold mb-0`}>This product is available in below sizes :</h6>
        <div className="d-flex">
          {[8.5, 22, 20, 8, 24].map((size, index) => (
            <button
              key={index}
              className={productDetailStyles.size_button}
              onClick={() => handleInputChange(index, { target: { name: 'size', value: size.toString() } })}
            >
              {size}
            </button>
          ))}
          <button className={`btn btn-link theme-blue ${styles.tableFontSize}`} onClick={handleAddRow}>
            Add Custom Size
          </button>
        </div>
      </div>
      <div className="mb-2">
        <div className={`row mx-1 ${styles.tableRow}`}>
          <div className="col-2 border text-center py-1">Purity</div>
          <div className="col-2 border text-center py-1">Colour</div>
          <div className="col-2 border text-center py-1">Weight</div>
          <div className="col-2 border text-center px-0 py-1">Size(inch)</div>
          <div className="col-3 border text-center py-1">Quantity</div>
          <div className="col border"></div>
        </div>
        {sizeTable.map((row, index) => (
          <div className="row mx-1" key={index}>
            <div className={`col-2 border text-center py-1  ${styles.tableFontSize}`}>{purity}</div>
            <div className="col-2 border py-1">
              <select
                name="colour"
                value={row.colour || colour}
                onChange={(e) => handleInputChange(index, e)}
                className={`border-0 form-control p-0 text-center ${styles.tableFontSize}`}
              >
                <option value="Yellow">Yellow</option>
                <option value="Rose">Rose</option>
                <option value="White">White</option>
              </select>
            </div>
            <div className="col-2 border d-flex justify-content-center px-0 py-1 flex-column">
              <input
                type="text"
                name="weight"
                className={`${productDetailStyles.qty_input} ${styles.tableFontSize} form-control`}
                onChange={(e) => handleInputChange(index, e)}
                value={row.weight}
              />
            </div>
            <div className="col-2 border d-flex justify-content-center px-0 py-1 flex-column">
              <input
                type="text"
                name="size"
                className={`${productDetailStyles.qty_input} ${styles.tableFontSize} form-control`}
                value={row.size}
                onChange={(e) => handleInputChange(index, e)}
              />
              {errors[index]?.size && <small className="text-danger">{errors[index].size}</small>}
            </div>
            <div className="col-3 border d-flex justify-content-center py-1 flex-column">
              <input
                type="text"
                name="quantity"
                className={`${productDetailStyles.qty_input} form-control ${styles.tableFontSize}`}
                value={row.quantity}
                onChange={(e) => handleInputChange(index, e)}
              />
              {errors[index]?.quantity && <small className="text-danger">{errors[index].quantity}</small>}
            </div>
            <div className="col border p-1">
              <IoClose className={`text-danger ${productDetailStyles.pointerCursor}`} onClick={() => handleDeleteRow(index)} />
            </div>
          </div>
        ))}
      </div>
      <div className="">
        <textarea
          name="wastage"
          value={cartProductsData?.wastage}
          placeholder="Wastage"
          className={`p-2 m-1 border w-100 ${styles.tableFontSize}`}
          onChange={(e) => setCartProductsData({ ...cartProductsData, wastage: e.target.value })}
          rows={1}
        ></textarea>
        <textarea
          name="remark"
          value={cartProductsData?.remark}
          placeholder="Enter note"
          className={`p-2 m-1 border w-100 ${styles.tableFontSize}`}
          onChange={(e) => setCartProductsData({ ...cartProductsData, remark: e.target.value })}
        ></textarea>
      </div>
      <div className="d-flex justify-content-start gap-3 ml-1">
        <button className={productDetailStyles.add_to_cart_btn} onClick={handleAddToCart}>
          Add To Cart
        </button>
        {reject && (
          <button className={`${productDetailStyles.reject_btn}`} onClick={() => setReject(false)}>
            Reject
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductDetailInfo;
