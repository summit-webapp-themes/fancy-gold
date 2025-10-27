import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { Table } from 'react-bootstrap';
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';
import stylesListing from '../../styles/components/_listingTable.module.scss';
import OrderFilters from '../OrderReport/OrderFilters';
import Pagination from '../Paginate/Pagination';

const ListingTable = ({ headers, tableData, handleSelectOrder, handleDeleteOrder, purity, handlePaginationBtn, orderListTotalCount }: any) => {
  const router = useRouter();
  const pathParts = router.asPath.split('/');
  const heading = pathParts[pathParts.length - 1]?.split('?')[0];

  const [filters, setFilters] = useState<any>({});
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    setFilters(() => ({ purity: purity }));
  }, []);
  
  const pageOffset = Number(router?.query?.page) - 1 || 0;

  const handlePageClick = (event: any) => {
    handlePaginationBtn(event?.selected);
  };

  function getUniqueValues(keys: any) {
    return keys.map((key: any) => ({
      label: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' '),
      key: key,
      options: Array.from(new Set(tableData.map((item: any) => item[key]))),
    }));
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const handleSort = (key: string) => {
    if (!key) return;
    setSortOrder((prevOrder) => (sortKey === key && prevOrder === 'asc' ? 'desc' : 'asc'));
    setSortKey(key);
  };

  const filteredData = tableData?.filter((item: any) => Object.keys(filters).every((key) => !filters[key] || item[key] === filters[key]));
  const sortedData = filteredData.sort((a: any, b: any) => {
    if (!sortKey) return 0;

    const valueA = a[sortKey];
    const valueB = b[sortKey];

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
    }

    return sortOrder === 'asc' ? valueA?.localeCompare(valueB) : valueB?.localeCompare(valueA);
  });

  const total = useMemo(() => {
    return filteredData.reduce(
      (acc: { total_weight: number }, item: any) => {
        acc.total_weight += Number(item.total_weight || 0);
        return acc;
      },
      { total_weight: 0 }
    );
  }, [filteredData]);

  const totalCount = orderListTotalCount || sortedData.length || 0;
  const isNextButtonDisabled: boolean = parseInt((totalCount / 12).toString(), 10) === pageOffset;

  return (
    <div className="container-lg">
      <h4 className="text-center my-4 fw-bold">
        {heading
          ?.split('-')
          ?.join(' ')
          ?.replace(/\b\w/g, (char) => char.toUpperCase())}
      </h4>
      <div className="text-end my-2">
        <button className="btn btn-secondary" onClick={handleDeleteOrder}>
          Cancel
        </button>
      </div>
      <div className="mt-2 mb-3">
        <OrderFilters
          data={getUniqueValues(['transaction_date', 'delivery_date', 'customer_name', 'name', 'purity'])}
          handleFilterChange={handleFilterChange}
          purity={purity}
        />
      </div>
      <Table striped responsive>
        <thead>
          <tr className="text-center">
            {headers?.length > 0 &&
              headers.map((headerItem: any, index: number) => (
                <th
                  key={index}
                  scope="col"
                  className={stylesListing.table_header}
                  onClick={() => handleSort(headerItem?.field_name?.toLowerCase().replace(/ /g, '_'))}
                >
                  <div className="d-flex align-items-center justify-content-start">
                    {headerItem?.header}
                    {index !== 0 && (
                      <span className="ms-2" style={{ cursor: 'pointer' }}>
                        {sortKey === headerItem?.field_name?.toLowerCase().replace(/ /g, '_') ? (
                          sortOrder === 'asc' ? (
                            <FaSortUp />
                          ) : (
                            <FaSortDown />
                          )
                        ) : (
                          <FaSort />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {sortedData?.length > 0 &&
            sortedData.map((data: any, index: number) => (
              <tr className={`text-start ${stylesListing.table_row}`} key={index}>
                <td>
                  <input type="checkbox" onClick={() => handleSelectOrder(data?.name)} />
                </td>
                <td>{data.transaction_date}</td>
                <td>
                  <Link href={`/order-detail/${data.name}`} className={stylesListing.redirect_name}>
                    {data.name}
                  </Link>
                </td>
                <td>{data.customer_name}</td>
                <td>{data.purity}</td>
                <td>{data?.total_weight?.toFixed(3)}</td>
                <td>{data.delivery_date}</td>
                <td>{data.status}</td>
              </tr>
            ))}
        </tbody>
        <tfoot>
          {sortedData?.length > 0 && (
            <tr className={`text-start ${stylesListing.table_row}`}>
              <td colSpan={5}> </td>
              <td className='text-center'>
                <strong>{total.total_weight.toFixed(3)}</strong>
              </td>
              <td colSpan={2}></td>
            </tr>
          )}
          <tr></tr>
        </tfoot>
      </Table>
      <Pagination totalCount={totalCount} handlePageClick={handlePageClick} pageOffset={pageOffset} isNextButtonDisabled={isNextButtonDisabled} />
    </div>
  );
};

export default ListingTable;
