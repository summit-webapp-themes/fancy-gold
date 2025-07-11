import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { get_access_token } from '../../../store/slices/auth/token-login-slice';
import { selectCart } from '../../../store/slices/cart-slices/cart-local-slice';
import { CONSTANTS } from '../../../services/config/app-config';
import useAddToCartHook from '../../../hooks/CartPageHook/useCartFunctions';
import { callGetAPI } from '../../../utils/http-methods';
import horizontalFilterStyles from '../../../styles/components/horizontalFilter.module.scss';
import PurityWarningModal from './PurityWarningModal';

const Purity = () => {
  const router = useRouter();
  const { query } = useRouter();
  const TokenFromStore: any = useSelector(get_access_token);
  const cartData: any = useSelector(selectCart);
  const { cLearCartAPIFunc } = useAddToCartHook();
  const [purityValues, setPurityValues] = useState([]);
  const [selectedPurity, setSelectedPurity] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<any>();
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleClearCart = () => {
    cLearCartAPIFunc(cartData?.quotation_Id);
    setShowModal(false);
  };
  const getPurityValues = async () => {
    const url = `${CONSTANTS.API_BASE_URL}/api/resource/Purity`;
    const fetchPurityValues = await callGetAPI(url, TokenFromStore.token);
    return fetchPurityValues;
  };
  const fetchValues = async () => {
    const values = await getPurityValues();
    setPurityValues(values?.data?.data);
  };
  useEffect(() => {
    fetchValues();
    const localPurity = localStorage.getItem('localPurity');

    if (localPurity === null) {
      localStorage.setItem('localPurity', '22KT');
    }
    setSelectedPurity(localPurity || '22KT');
  }, []);

  const handleSelectPurity = (purityValue: string) => {
    if (cartData?.cartCount <= 0) {
      setSelectedPurity(purityValue);
      localStorage.setItem('localPurity', purityValue);
    } else {
      setShowModal(true);
    }
  };

  return (
    <div className="d-flex justify-content-centerstart flex-wrap gap-2">
      {purityValues?.map((purity: any) => (
        <>
          <button
            className={`${
              selectedPurity === purity.name ? horizontalFilterStyles.purity_button_active : horizontalFilterStyles.purity_button
            } mx-0`}
            onClick={(e) => handleSelectPurity(purity.name)}
            style={{ padding: '3px 0'}}
          >
            {purity.name}
          </button>
        </>
      ))}
      <PurityWarningModal show={showModal} handleClose={handleCloseModal} purity={selectedPurity} handleClearCart={handleClearCart} />
    </div>
  );
};

export default Purity;
