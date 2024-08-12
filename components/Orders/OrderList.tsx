import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import useOrderListHook from '../../hooks/OrderListHooks/useOrderListHook';
import image from '../../public/assets/images/no-data.svg';
const ListingTable = dynamic(() => import('./ListingTable'));
import ComponentErrorHandler from '../ComponentErrorHandler';
import OrderReportLoadingSkeleton from '../OrderReport/OrderReportLoadingSkeleton';

const OrderList = () => {
  const { orderListData, isLoading, errorMessage }: any = useOrderListHook();

  const headers: any = ['Order Id', 'Transaction Date', 'Status', 'Total Ordered Weight', 'Delivery Date', 'Total Dispatched Weight'];

  const showOrderListingSection: any = () => {
    if (isLoading) {
      return (
        <>
          <div className="container">
            <OrderReportLoadingSkeleton />
          </div>
        </>
      );
    }
    if (errorMessage) {
      return <ComponentErrorHandler error={errorMessage} />;
    }
    if (orderListData) {
      if (orderListData?.length > 0) {
        return <ListingTable headers={headers} tableData={orderListData} />;
      }

      if (orderListData?.length === 0) {
        return (
          <div className={`text-center `}>
            <div className="p-3" style={{ fontSize: '40px' }}>
              <Image src={image} width={200} height={200} alt="Error Image" />
            </div>
            <div className="text-center">
              <h2 className="theme-blue">Sorry, No Data Found</h2>
            </div>
          </div>
        );
      }
    }
  };

  return <>{showOrderListingSection()}</>;
};

export default OrderList;
