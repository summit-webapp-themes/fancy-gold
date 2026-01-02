import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useOrderListHook from '../../hooks/OrderListHooks/useOrderListHook';
import image from '../../public/assets/images/no-data.png';
import ComponentErrorHandler from '../ComponentErrorHandler';
import OrderReportLoadingSkeleton from '../OrderReport/OrderReportLoadingSkeleton';

const ListingTable = dynamic(() => import('./ListingTable'));

const OrderList = () => {

  const router = useRouter();

  const {
    orderListData,
    isLoading,
    errorMessage,
    handleSelectOrder,
    deleteBulkOrder,
    handlePaginationBtn,
    orderListTotalCount,
    filters,
    setFilters,
    filterOptions,
  } = useOrderListHook();

  const getTitle = () => {
    const path = router.asPath;

    if (path.includes('completed-orders')) {
      return 'Completed Orders';
    }

    if (path.includes('cancelled-orders')) {
      return 'Cancelled Orders';
    }

    return 'Order History';
  };

  const title = getTitle();

  const headers = [
    { field_name: '', header: '' },
    { field_name: 'transaction_date', header: 'Order Date' },
    { field_name: 'name', header: 'Order Id' },
    { field_name: 'customer_name', header: 'Customer Name' },
    { field_name: 'purity', header: 'Purity' },
    { field_name: 'total_weight', header: 'Total Ordered Weight' },
    { field_name: 'delivery_date', header: 'Due Date' },
    { field_name: 'status', header: 'Status' },
  ];

  if (isLoading) {
    return (
      <div className="container">
        <OrderReportLoadingSkeleton />
      </div>
    );
  }

  if (errorMessage) {
    return <ComponentErrorHandler error={errorMessage} />;
  }


  return (
    <>
      <div className="container mb-4 text-center">
        <h2 className="theme-blue">{title}</h2>
      </div>

      <ListingTable
        headers={headers}
        tableData={orderListData}
        filters={filters}
        setFilters={setFilters}
        filterOptions={filterOptions}
        handleSelectOrder={handleSelectOrder}
        handleDeleteOrder={deleteBulkOrder}
        handlePaginationBtn={handlePaginationBtn}
        orderListTotalCount={orderListTotalCount}
      />
    </>
  );
};

export default OrderList;
