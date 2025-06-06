import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { CONSTANTS } from '../../services/config/app-config';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import { callGetAPI } from '../../utils/http-methods';
import Purity from '../ProductListingComponents/HorizontalFilterList.tsx/Purity';
import SearchableDropdown from '../SearchableDropdown';
import styles from '../../styles/components/orderDetail.module.scss';

const QuickOrderForm = ({ setQuickOrderData, quickOrderData }: any) => {
  const { API_BASE_URL,ARC_APP_CONFIG  } = CONSTANTS;
  const tokenFromStore = useSelector(get_access_token);
  const [inputValue, setInputValue] = useState('');
  const [qtySizeInput, setQtySizeInput] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [refCodesList, setRefCodesList] = useState([]);
  const [disableInputField, setDisabledInputField] = useState(true);

  const purity = localStorage.getItem('localPurity');
  let user = localStorage.getItem('user');

  const handleInputChange = (event: any, field: any) => {
    let inputValue = event.target.value;
    if (field === 'qty_size') {
      setQtySizeInput(inputValue);
    } else if (field === 'customer_name') {
      setCustomerName(inputValue);
    }
  };

  const getCustomerItemAPI = async () => {
    const version = ARC_APP_CONFIG?.version;
    const method = 'get_customer_item_by_customer_name_and_item_code';
    const entity = 'customer_item_reference_code_api';
    const url = `${API_BASE_URL}${ARC_APP_CONFIG?.app_name}?version=${version}&method=${method}&entity=${entity}&customer_name=${customerName}`;
    const response = callGetAPI(url, tokenFromStore?.token);
    return response;
  };

  const handleCustomerName = async () => {
    let refCodesList = await getCustomerItemAPI();
    if (refCodesList?.data?.message?.msg === 'success' && refCodesList?.data?.message?.data?.length > 0) {
      setRefCodesList(refCodesList?.data?.message?.data);
      setDisabledInputField(false);
    } else {
      setRefCodesList([]);
    }
  };

  const handleSaveBtn = () => {
    if (Object.keys(qtySizeInput)?.length > 0 || inputValue) {
      const ordersArray = qtySizeInput.split(',').map((order) => {
        const [size, qty] = order.split('/');
        return { size: parseInt(size), qty: parseInt(qty) };
      });

      const newRecord = { item_code: inputValue, qty_size_list: ordersArray };
      setQuickOrderData((prevData: any) => [...prevData, newRecord]);
      setInputValue('');
      setQtySizeInput('');
    }
  };
  const postQuickOrderAPI: any = async (apiBody: any) => {
    let response: any;
    const apiSDKName = ARC_APP_CONFIG?.app_name;

    let body = {
      version: ARC_APP_CONFIG?.version,
      method: 'create_sales_quotation',
      entity: 'customer_item_reference_code_api',
      ...apiBody,
    };

    await axios
      .post(`${CONSTANTS.API_BASE_URL}${apiSDKName}`, body)
      .then((res: any) => {
        response = res;
      })
      .catch((err: any) => {});
    return response;
  };
  const handleSubmitBtn = async () => {
    const values = {
      customer_name: customerName,
      purity: purity,
      user: user,
      items: quickOrderData,
    };
    let createQuickOrderRecord = await postQuickOrderAPI(values);
    if (createQuickOrderRecord?.data?.message?.msg === 'success' && createQuickOrderRecord?.data?.message?.data?.includes('Quotation')) {
      setQuickOrderData([]);
      toast.success(`${createQuickOrderRecord?.data?.message?.data}`);
    } else {
      toast.error('Something went wrong while creating Quotation. Please try again.');
    }
  };

  return (
    <div>
      <div className="text-center mt-5">
        <Purity />
      </div>
      <div className="mt-4 row m-0">
        <div className="col-lg-10 col-12">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-6 pe-2 ps-0">
              <input
                type="text"
                className="form-control"
                value={customerName}
                placeholder="Customer Name"
                onChange={(e) => handleInputChange(e, 'customer_name')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleCustomerName();
                  }
                }}
              />
              <p style={{ fontSize: '12px', color: '#f00', margin: 0 }}>*Add customer name first and press Enter</p>
            </div>

            <div className="col-lg-3 col-md-3 col-sm-6 pe-2 ps-0">
              <SearchableDropdown
                dropdownData={refCodesList}
                inputValue={inputValue}
                setInputValue={setInputValue}
                disabled={disableInputField}
              />
            </div>

            <div className="col-lg-3 col-md-3 col-12 mt-2 mt-md-0 pe-2 ps-0">
              <input
                type="text"
                className="form-control"
                value={qtySizeInput}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSaveBtn();
                  }
                }}
                onChange={(e) => handleInputChange(e, 'qty_size')}
                disabled={disableInputField}
              />
            </div>

            <div className="d-flex justify-content-start gap-2 justify-content-md-end align-items-start col-lg-3 col-md-3 col-12 text-center mt-2 mt-md-0 pe-2 ps-0">
              <button type="button" className={styles.quick_order_btn} onClick={handleSaveBtn}>
                Save
              </button>
              <button type="button" className={styles.quick_order_btn} onClick={handleSubmitBtn}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickOrderForm;
