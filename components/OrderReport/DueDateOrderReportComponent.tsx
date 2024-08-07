import React from 'react';
import { Table } from 'react-bootstrap';
import useDueDateOrder from '../../hooks/ReportHook/useDueDateOrder';
import OrderReportTableMaster from './OrderReportTableMaster';
import OrderReportLoadingSkeleton from './OrderReportLoadingSkeleton';

const DueDateOrderReportComponent = () => {
  const { dueDateOrderData, isLoading, errorMessage } = useDueDateOrder();
  const handleDataRendering = () => {
    if (isLoading) {
      return <OrderReportLoadingSkeleton Title={'Due Date Order Report'} />;
    }
    if (dueDateOrderData?.length > 0) {
      return <OrderReportTableMaster tableBodyData={dueDateOrderData} title={'Due Date Order Report'} />;
    }
    if (errorMessage !== '' && dueDateOrderData?.length == 0 && isLoading === false) {
      return <h4 className="theme-blue text-center mt-4">{errorMessage}</h4>;
    }
  };
  return <>{handleDataRendering()}</>;
};

export default DueDateOrderReportComponent;
