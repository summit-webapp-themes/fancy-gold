import React from 'react';
import { Table } from 'react-bootstrap';
import useDispatchsOrder from '../../hooks/ReportHook/useDispatchOrder';
import OrderReportTableMaster from './OrderReportTableMaster';
import OrderReportLoadingSkeleton from './OrderReportLoadingSkeleton';

const DispatchOrderReportComponent = () => {
  const { disptachOrderData, isLoading, errorMessage } = useDispatchsOrder();
  const handleDataRendering = () => {
    if (isLoading) {
      return <OrderReportLoadingSkeleton Title={'Dispatch Order Report'} />;
    }
    if (disptachOrderData?.length > 0) {
      return <OrderReportTableMaster tableBodyData={disptachOrderData} title={'Dispatch Order Report'} />;
    }
    if (errorMessage !== '' && disptachOrderData?.length == 0 && isLoading === false) {
      return <h4 className="theme-blue text-center mt-4">{errorMessage}</h4>;
    }
  };
  return <>{handleDataRendering()}</>;
};

export default DispatchOrderReportComponent;
