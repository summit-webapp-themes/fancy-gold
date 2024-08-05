import React from 'react';
import ListingTable from './ListingTable';
import useOrderListHook from '../../hooks/OrderListHooks/useOrderListHook';
import Image from 'next/image';
import image from '../../public/assets/images/no-data.svg';

const CompletedOrders = () => {
  const { orderListData, isLoading, errorMessage }: any = useOrderListHook();

  const headers: any = ['Order Id', 'Transaction Date', 'Status', 'Total Ordered Weight', 'Delivery Date', 'Total Dispatched Weight'];

  const showCompletedOrderSection: any = () => {
    if (isLoading) {
      return <h4>Loading</h4>;
    }
    if (orderListData?.length > 0) {
      return (
        <div className="container">
          <h4 className="text-center my-4 fw-bold">Completed Order List</h4>
          <ListingTable headers={headers} tableData={orderListData} />
        </div>
      );
    }

    if (isLoading === false && orderListData?.length === 0) {
      return (
        <div className="text-center mt-5">
          <div className="p-3" style={{ fontSize: '40px' }}>
            <Image src={image} width={200} height={200} alt="Error Image" />
          </div>
          <div className="text-center">
            <h2 className="theme-blue">Sorry, No Data Found</h2>
          </div>
        </div>
      );
    }
  };
  return <>{showCompletedOrderSection()}</>;
};

export default CompletedOrders;
