import React from 'react';
import OrderReportTableMaster from './OrderReportTableMaster';
import OrderReportLoadingSkeleton from './OrderReportLoadingSkeleton';
import useOrderReport from '../../hooks/ReportHook/useOrderReport';
import CheckGuestLogin from '../../services/api/auth/guest-login-api';

const OrderReportComponent = () => {
  const { OrderReportData, isLoading, errorMessage, router } = useOrderReport();
  const title = router.query.order_report
    .split('-')
    .map((item: string) => item?.charAt(0).toUpperCase() + item.slice(1))
    .join(' ');
  const handleDataRendering = () => {
    if (isLoading) {
      return <OrderReportLoadingSkeleton Title={title} />;
    }
    if (OrderReportData?.length > 0) {
      return <OrderReportTableMaster tableBodyData={OrderReportData} title={title} purity={''}/>;
    }
    if (errorMessage !== '' && OrderReportData?.length == 0 && isLoading === false) {
      return <h4 className="theme-blue text-center mt-4">{errorMessage}</h4>;
    }
  };
  return <>{handleDataRendering()}</>;
};

export default OrderReportComponent;
