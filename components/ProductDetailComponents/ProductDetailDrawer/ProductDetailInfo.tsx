import { useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useAddToCartHook from '../../../hooks/CartPageHook/useCartFunctions';
import { CONSTANTS } from '../../../services/config/app-config';
import { get_access_token } from '../../../store/slices/auth/token-login-slice';
import { selectCart } from '../../../store/slices/cart-slices/cart-local-slice';
import styles from '../../../styles/components/productCard.module.scss';
import productDetailStyles from '../../../styles/components/productDetail.module.scss';
import { callPostAPI } from '../../../utils/http-methods';

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
    quantity: '',
    remark: '',
    design_style: '',
  };

  const [sizeTable, setSizeTable] = useState([initialState]);
  const [cartProductsData, setCartProductsData] = useState<any>({
    wastage: '',
    remark: '',
    rejection_note: '',
  });
  const [errors, setErrors] = useState<{ [key: number]: { size?: string; quantity?: string } }>({});
  const [customerError, setCustomerError] = useState('');
  const [reject, setReject] = useState(false);
  const inputRefs = useRef<any[]>([]);

  const handleAddRow = () => {
    setSizeTable([...sizeTable, initialState]);
  };

  const handleDeleteRow = (index: number) => {
    const updatedSizeTable = sizeTable.filter((_, i) => i !== index);
    setSizeTable(updatedSizeTable);
  };
  const handleKeyDown = (event: any) => {
    event.preventDefault();
    if (event?.key === 'Enter' || event?.keyCode === 13) {
      handleAddRow();
      setTimeout(() => {
        // Focus on the size input of the last row
        const lastIndex = sizeTable.length;
        inputRefs.current[lastIndex]?.focus();
      }, 0);
    }
  };
  const handleInputChange = (index: number, event: any) => {
    const { name, value } = event.target;
    const updatedSizeTable = sizeTable.map((row, i) => {
      if (i === index) {
        const updatedRow = { ...row, [name]: value };
        return updatedRow;
      }
      return row;
    });

    setSizeTable(updatedSizeTable);
  };
  const handleCartData = (field: string, value: any) => {
    setCartProductsData((prev: any) => ({ ...prev, [field]: value }));
  };
  const postRejectionNoteAPI = (params: any) => {
    const version = CONSTANTS?.ARC_APP_CONFIG?.version;
    const method = 'reject_new_arrival_item';
    const entity = 'product_list';
    const apiSDKName = CONSTANTS?.ARC_APP_CONFIG?.app_name;
    const url = `${CONSTANTS?.API_BASE_URL}${apiSDKName}?version=${version}&method=${method}&entity=${entity}&item_code=${params?.item_code}&rejection_note=${params?.rejection_note}&reject_status=1`;
    const postNote = callPostAPI(url, undefined, TokenFromStore?.token);
    return postNote;
  };
  const handleRejectionNote = async () => {
    const params = {
      item_code: data?.name,
      rejection_note: cartProductsData?.rejection_note,
    };
    if (cartProductsData?.rejection_note && cartProductsData?.rejection_note !== '') {
      const postNote = await postRejectionNoteAPI(params);
      if (postNote?.data?.message?.msg === 'success') {
        setReject(false);
        setCartProductsData({ ...cartProductsData, rejection_note: '' });
        toast.success('Product rejected successfully');
        getProductDetailData(data?.name);
      } else {
        toast.error('Failed to Reject Product');
      }
    }
  };
  const handleSizeButtonClick = (size: number) => {
    if (sizeTable[sizeTable.length - 1]?.size || sizeTable?.length === 0) {
      const newRow = { ...initialState, size: size.toString() };
      setSizeTable([...sizeTable, newRow]);
    } else {
      const updatedSizeTable = sizeTable.map((row, i) => (i === sizeTable.length - 1 ? { ...row, size: size.toString() } : row));
      setSizeTable(updatedSizeTable);
    }
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
      item_code: data?.name || '',
      party_name: party_name || '',
      purity: purity || '',
      cust_name: cust_name || '',
      colour: colour || '',
      // wastage: cartPrductsData.wastage,
      qty_size_list: sizeTable || [],
      remark: cartProductsData.remark || '',
      user: user || '',
    };
    if (cust_name !== '' && cust_name !== null) {
      setCustomerError('');
      addToCartItem(addToCartParams);
      setSizeTable([initialState]);
    } else {
      setCustomerError('Customer name is empty!');
    }
    setCartProductsData({
      wastage: '',
      remark: '',
      rejection_note: '',
    });
  };
  const isVariantInCart = (variant_code: any) => {
    return cartList?.length > 0 && cartList?.some((cartItem: any) => cartItem === variant_code);
  };

  function computeFormulaFieldValue(value: any[], value_2: any[], data: Record<string | number, any>, row: any) {
    const formula = value && value_2 && [...value, ...value_2].join(' ');
    const replaced = formula?.replace(/\b[a-zA-Z_]\w*\b/g, (token) => {
      if (value?.includes(token)) return data?.[token] ?? 0;
      if (value_2?.includes(token)) return row?.[token] ?? 0;
      return token;
    });
    try {
      return Number(eval(replaced))?.toFixed(3);
    } catch {
      return '0.000';
    }
  }

  function capitalizeFirstLetter(str: string) {
    return str?.charAt(0).toUpperCase() + str?.slice(1);
  }

  const rendertTableFields = (itemForTable: any, index: number, row: any) => {
    switch (itemForTable?.data_type) {
      case 'custom':
        return (
          <div className="col-2 border  py-1" key={index}>
            <input
              type="text"
              name={itemForTable.specification?.toLowerCase()}
              className={`${productDetailStyles.qty_input} form-control p-0 ${styles.tableFontSize}`}
              value={row[itemForTable.specification?.toLowerCase()]}
              onChange={(e) => handleInputChange(index, e)}
              ref={(el) => (inputRefs.current[index] = el)} // Assign ref dynamically
            />
          </div>
        );
      case 'fetch':
        return <div className={`col-2 border text-center py-1  ${styles.tableFontSize}`}>{data[itemForTable.value?.toLowerCase()]}</div>;
      case 'select':
        return (
          <div className={`col-2 border py-1`}>
            <select
              name={itemForTable.specification?.toLowerCase()}
              value={row?.colour || colour}
              onChange={(e) => handleInputChange(index, e)}
              className={`border-0 form-control p-0 text-center ${styles.tableFontSize}`}
            >
              {itemForTable.value?.map((option: string, idx: number) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );
      case 'formula':
        return (
          <div className="col-2 border py-1 text-center ">
            <div className={`${styles.tableFontSize}`}>
              {
                // ((Number(data?.weight_per_unit) / Number(data?.length)) * Number(row.size)).toFixed(3)
                computeFormulaFieldValue(itemForTable.value, itemForTable.value_2, data, row)
              }
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-100">
      <div className="py-2">
        <h6 className={`${styles.productCode} fw-bold mb-0`}>This product is available in below sizes :</h6>
        <div className="d-flex">
          {Array.isArray(data?.item_characteristics?.size) && data?.item_characteristics?.size.length > 0 && (
            <>
              {[...data.item_characteristics.size]
                .filter((size: any) => typeof size === 'number')
                .sort((a: any, b: any) => a - b)
                .map((size: number, index: number) => {
                  const isActive = sizeTable.some((item: any) => item?.size === size.toString());
                  return (
                    <button
                      key={index}
                      className={isActive ? productDetailStyles.size_button_active : productDetailStyles.size_button}
                      onClick={() => handleSizeButtonClick(size)}
                    >
                      {size}
                    </button>
                  );
                })}

              {data.item_characteristics.size.includes('custom_size') && (
                <button className={`btn btn-link theme-blue mt-3 ${styles.tableFontSize}`} onClick={handleAddRow}>
                  Add Custom Size
                </button>
              )}
            </>
          )}
        </div>
      </div>
      <div className="mb-2">
        <div className={`row mx-1 ${styles.tableRow}`}>
          {data?.category_specification?.length > 0 ? (
            <>
              <div className="col-2 border text-center py-1">Purity</div>
              {data.category_specification.map((itemForTable: any, index: number) => (
                <div className="col-2 border text-center py-1" key={index}>
                  {capitalizeFirstLetter(itemForTable?.specification)}
                </div>
              ))}
            </>
          ) : null}
          {/* <div className="col border"></div> */}
        </div>
        {sizeTable?.map((row, index) => (
          <div className="" key={index}>
            <div className="row mx-1">
              {data?.category_specification?.length > 0 ? (
                <>
                  <div className={`col-2 border text-center py-1 ${styles.tableFontSize}`}>{purity}</div>
                  {data?.category_specification.map((itemForTable: any, itemForTableIdx: number) => {
                    return <>{rendertTableFields(itemForTable, index, row)}</>;
                  })}
                  <div className="col-2 text-center border p-1">
                    <button
                      className="border-0 bg-light p-0 text-center"
                      onClick={() => handleDeleteRow(index)}
                      onKeyDown={(e) => handleKeyDown(e)}
                    >
                      <IoClose className={`text-danger ${productDetailStyles.pointerCursor}`} />
                    </button>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        ))}
      </div>
      <div className="">
        <textarea
          name="remark"
          value={cartProductsData?.remark}
          placeholder="Enter note"
          className={`p-2 m-1 border w-100 ${styles.tableFontSize}`}
          onChange={(e) => setCartProductsData({ ...cartProductsData, remark: e.target.value })}
        ></textarea>
        {reject && (
          <textarea
            name="rejection_note"
            value={cartProductsData?.rejection_note}
            placeholder="Enter rejection note"
            className={`p-2 m-1 border w-100 ${styles.tableFontSize}`}
            onChange={(e) => setCartProductsData({ ...cartProductsData, rejection_note: e.target.value })}
          ></textarea>
        )}
      </div>
      <div className="row">
        {Object.entries(data?.item_characteristics || {})
          .filter(([key]) => key.toLowerCase() !== 'size') // skip "Size"
          .map(([key, config]: [string, any], index: number) => {
            const label = key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
            const value = cartProductsData?.[key] || '';

            return (
              <div key={index} className="col-12">
                {/* <label className="form-label">{label}</label> */}

                {Array.isArray(config) ? (
                  // Handle dropdown for 'select'
                  <select name={key} className="form-select" value={value} onChange={(e) => handleInputChange(index, e.target.value)}>
                    <option value="">Select {label}</option>
                    {config.map((option: string, idx: number) => (
                      <option key={idx} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : config === 'textfield' ? (
                  <textarea
                    name={key}
                    value={value}
                    placeholder={key}
                    className={`p-2 ms-1 border w-100 ${styles.tableFontSize}`}
                    onChange={(e) => handleCartData(key, e.target.value)}
                  ></textarea>
                ) : config === 'checkbox' ? (
                  <div className="form-check">
                    <input
                      name={key}
                      className="form-check-input"
                      type="checkbox"
                      checked={value}
                      onChange={(e) => handleCartData(key, e.target.checked)}
                    />
                    <label className="form-check-label">{key}</label>
                  </div>
                ) : config === 'buttons' ? (
                  <div className="d-flex flex-wrap gap-2">
                    {['Option 1', 'Option 2', 'Option 3'].map((btn, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`btn btn-sm ${value === btn ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => handleCartData(key, btn)}
                      >
                        {btn}
                      </button>
                    ))}
                  </div>
                ) : (
                  <input
                    name={key}
                    type="text"
                    className="form-control"
                    value={value}
                    onChange={(e) => handleCartData(key, e.target.value)}
                  />
                )}
              </div>
            );
          })}
      </div>
      {customerError !== '' && <p className="text-danger">{customerError}</p>}
      <div className="d-flex justify-content-start gap-3 ml-1">
        {isVariantInCart(data?.name) ? (
          <button className={productDetailStyles.cart_add_to_cart_btn} onClick={handleAddToCart}>
            Added
          </button>
        ) : (
          <button className={productDetailStyles.add_to_cart_btn} onClick={handleAddToCart}>
            Add To Cart
          </button>
        )}
        {data?.reject_button_value === 1 ? (
          <button className={`${productDetailStyles.reject_btn} `} disabled>
            Rejected
          </button>
        ) : (
          <button className={`${productDetailStyles.reject_btn} `} onClick={() => (reject ? handleRejectionNote() : setReject(true))}>
            Reject
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductDetailInfo;
