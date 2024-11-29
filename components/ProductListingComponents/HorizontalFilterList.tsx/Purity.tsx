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
  const [selectedPurity, setSelectedPurity] = useState('22KT');
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
    localStorage.setItem('localPurity', selectedPurity);
  }, []);
  useEffect(() => {
    if (query.filter) {
      try {
        const decodedFilterString = decodeURIComponent(query.filter as string);
        const decodedFilters = JSON.parse(decodedFilterString);

        setSelectedFilters(decodedFilters);

        const purityFilter = decodedFilters.find((filter: any) => filter.name === 'Purity');
        setSelectedPurity(purityFilter ? purityFilter.value[0] : '22KT');
      } catch (error) {
        setSelectedFilters([]);
        setSelectedPurity('22KT');
      }
    } else {
      setSelectedFilters([]);
      setSelectedPurity('22KT');
    }
  }, [query]);

  const handleSelectPurity = (purityValue: string) => {
    if (cartData?.cartCount <= 0) {
      setSelectedPurity(purityValue);

      let updatedFilters;
      if (selectedFilters?.length > 0) {
        updatedFilters = selectedFilters.map((filter: any) => {
          if (filter.name === 'Purity') {
            return { ...filter, value: [purityValue] };
          }
          return filter;
        });
      } else {
        updatedFilters = [{ name: 'Purity', value: [purityValue] }];
      }
      setSelectedFilters(updatedFilters);

      const filterString = updatedFilters?.length > 0 ? `&filter=${encodeURIComponent(JSON.stringify(updatedFilters))}` : '';
      let url = router.asPath;
      const existingFilterIndex = url.indexOf('&filter=');

      if (existingFilterIndex !== -1) {
        const ampIndex = url.indexOf('&', existingFilterIndex + 1);
        if (ampIndex !== -1) {
          url = url.slice(0, existingFilterIndex) + url.slice(ampIndex);
        } else {
          url = url.slice(0, existingFilterIndex);
        }
      }

      if (filterString) {
        url = `${url.split('?')[0]}?&page=1${filterString}`;
      } else {
        url = `${url.split('?')[0]}?page=1`;
      }

      router.push(url, undefined, { shallow: true });
    } else {
      setShowModal(true);
    }
  };

  return (
    <div className="justify-content-center" style={{ height: '100%' }}>
      {purityValues?.map((purity: any) => (
        <>
          <button
            className={`${
              selectedPurity === purity.name ? horizontalFilterStyles.purity_button_active : horizontalFilterStyles.purity_button
            }`}
            onClick={(e) => handleSelectPurity(purity.name)}
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
