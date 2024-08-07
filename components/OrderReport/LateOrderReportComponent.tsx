import React from 'react';
import { Table } from 'react-bootstrap';
import useLateOrder from '../../hooks/ReportHook/useLateOrder';
import OrderReportTableMaster from './OrderReportTableMaster';
import OrderReportLoadingSkeleton from './OrderReportLoadingSkeleton';

const LateOrderReportComponent = () => {
  const { lateOrderData, isLoading, errorMessage } = useLateOrder();
  const handleDataRendering = () => {
    if (isLoading) {
      return <OrderReportLoadingSkeleton Title={'Late Order Report'} />;
    }
    if (lateOrderData?.length > 0) {
      return <OrderReportTableMaster tableBodyData={lateOrderData} title={'Late Order Report'} />;
    }
    if (errorMessage !== '' && lateOrderData?.length == 0 && isLoading === false) {
      return <h4 className="theme-blue text-center mt-4">{errorMessage}</h4>;
    }
  };
  return <div>{handleDataRendering()}</div>;
};

export default LateOrderReportComponent;
