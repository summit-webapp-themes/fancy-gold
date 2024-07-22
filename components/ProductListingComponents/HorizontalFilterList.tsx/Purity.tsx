import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { get_access_token } from '../../../store/slices/auth/token-login-slice';
import { CONSTANTS } from '../../../services/config/app-config';
import { callGetAPI } from '../../../utils/utils';

const Purity = () => {
  const router = useRouter();
  const { query } = useRouter();
  const TokenFromStore: any = useSelector(get_access_token);
  const [purityValues, setPurityValues] = useState([]);
  const [selectedPurity, setSelectedPurity] = useState('22KT');
  const [selectedFilters, setSelectedFilters] = useState<any>();
  const getPurityValues = async () => {
    const url = `${CONSTANTS.API_BASE_URL}api/resource/Purity`;
    const fetchPurityValues = await callGetAPI(url, TokenFromStore.token);
    return fetchPurityValues;
  };
  const fetchValues = async () => {
    const values = await getPurityValues();
    setPurityValues(values?.data?.data);
  };
  useEffect(() => {
    fetchValues();
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
        console.error('Failed to decode and parse filters:', error);
        setSelectedFilters([]);
        setSelectedPurity('22KT');
      }
    } else {
      setSelectedFilters([]);
      setSelectedPurity('22KT');
    }
  }, [query]);

  const handleSelectPurity = (purityValue: string) => {
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

    const encodedFilters = encodeURIComponent(JSON.stringify(updatedFilters));
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, filter: encodedFilters },
      },
      undefined,
      { shallow: true }
    );
  };
  return (
    <div className="justify-content-center">
      {purityValues?.map((purity: any) => (
        <>
          <button
            className={`${selectedPurity === purity.name ? 'purity_button-active' : 'purity_button'}`}
            onClick={(e) => handleSelectPurity(purity.name)}
          >
            {purity.name}
          </button>
        </>
      ))}
    </div>
  );
};

export default Purity;
