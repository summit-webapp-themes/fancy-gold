import React, { useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import useOrderListHook from '../../hooks/OrderListHooks/useOrderListHook';
import image from '../../public/assets/images/no-data.png';
const ListingTable = dynamic(() => import('./ListingTable'));
import ComponentErrorHandler from '../ComponentErrorHandler';
import OrderReportLoadingSkeleton from '../OrderReport/OrderReportLoadingSkeleton';

const OrderList = () => {
  const { orderListData, isLoading, errorMessage, handleSelectOrder, deleteBulkOrder }: any = useOrderListHook();

  const headers: any = ['', 'Order Date ', 'Order Id', 'Customer Name', 'Total Ordered Weight', 'Due Date', 'Status'];

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
        return (
          <ListingTable
            headers={headers}
            tableData={orderListData}
            handleSelectOrder={handleSelectOrder}
            handleDeleteOrder={deleteBulkOrder}
          />
        );
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
