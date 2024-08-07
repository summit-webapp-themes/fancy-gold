import React from 'react';
import useReviewReport from '../../hooks/ReportHook/useReviewReport';
import OrderReportLoadingSkeleton from './OrderReportLoadingSkeleton';
import OrderReportTableMaster from './OrderReportTableMaster';

const ReviewReportComponent = () => {
  const { reviewOrderData, isLoading, errorMessage } = useReviewReport();
  const handleDataRendering = () => {
    if (isLoading) {
      return <OrderReportLoadingSkeleton Title={'Review Order Report'} />;
    }
    if (reviewOrderData?.length > 0) {
      return <OrderReportTableMaster tableBodyData={reviewOrderData} title={'Review Order Report'} />;
    }
    if (errorMessage !== '' && reviewOrderData?.length == 0 && isLoading === false) {
      return <h4 className="theme-blue text-center mt-4">{errorMessage}</h4>;
    }
  };

  return <div>{handleDataRendering()}</div>;
};

export default ReviewReportComponent;
