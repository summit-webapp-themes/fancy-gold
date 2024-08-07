import React from 'react';
import usePendingOrder from '../../hooks/ReportHook/usePendingOrder';
import { Table } from 'react-bootstrap';
import OrderReportTableMaster from './OrderReportTableMaster';
import OrderReportLoadingSkeleton from './OrderReportLoadingSkeleton';

const PendingOrderReport = () => {
  const { pendingOrderData, isLoading, errorMessage } = usePendingOrder();
  const handleDataRendering = () => {
    if (isLoading) {
      return <OrderReportLoadingSkeleton Title={'Pending Order Report'} />;
    }
    if (pendingOrderData?.length > 0) {
      return <OrderReportTableMaster tableBodyData={pendingOrderData} title={'Pending Order Report'} />;
    }
    if (errorMessage !== '' && pendingOrderData?.length == 0 && isLoading === false) {
      return <h4 className="theme-blue text-center mt-4">{errorMessage}</h4>;
    }
  };
  return <>{handleDataRendering()}</>;
};

export default PendingOrderReport;
