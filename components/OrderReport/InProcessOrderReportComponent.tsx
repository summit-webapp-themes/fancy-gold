import React from 'react';
import useInProcessOrder from '../../hooks/ReportHook/useInProcessOrder';
import { Table } from 'react-bootstrap';
import OrderReportTableMaster from './OrderReportTableMaster';
import OrderReportLoadingSkeleton from './OrderReportLoadingSkeleton';

const InProcessOrderReportComponent = () => {
  const { processOrderData, isLoading, errorMessage } = useInProcessOrder();
  const handleDataRendering = () => {
    if (isLoading) {
      return <OrderReportLoadingSkeleton Title={'In Progress Order Report'} />;
    }
    if (processOrderData?.length > 0) {
      return <OrderReportTableMaster tableBodyData={processOrderData} title={'In Progress Order Report'} />;
    }
    if (errorMessage !== '' && processOrderData?.length == 0 && isLoading === false) {
      return <h4 className="theme-blue text-center mt-4">{errorMessage}</h4>;
    }
  };
  return <>{handleDataRendering()}</>;
};

export default InProcessOrderReportComponent;
