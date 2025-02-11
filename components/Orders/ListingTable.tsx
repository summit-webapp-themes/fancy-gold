import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import stylesListing from '../../styles/components/_listingTable.module.scss';
import OrderFilters from '../OrderReport/OrderFilters';
import { Table } from 'react-bootstrap';

const ListingTable = ({ headers, tableData, handleSelectOrder, handleDeleteOrder }: any) => {
  const router = useRouter();
  const pathParts = router.asPath.split('/');
  const heading = pathParts[pathParts.length - 1];
  const [filters, setFilters] = useState<any>({});
  function getUniqueValues(keys: any) {
    let result = keys.map((key: any) => ({
      label: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' '),
      key: key,
      options: Array.from(new Set(tableData.map((item: any) => item[key]))),
    }));
    return result;
  }
  const handleFilterChange = (key: string, value: string) => {
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const filteredData = tableData?.filter((item: any) => {
    return Object.keys(filters).every((key) => !filters[key] || item[key] === filters[key]);
  });

  return (
    <>
      <div className="container">
        <h4 className="text-center my-4 fw-bold">
          {heading
            ?.split('-')
            ?.join(' ')
            ?.replace(/\b\w/g, (char) => char.toUpperCase())}
        </h4>
        <div className="text-end my-2">
          <button className="btn btn-secondary " onClick={handleDeleteOrder}>
            Cancel
          </button>
        </div>
        <div className="mt-2 mb-3">
          <OrderFilters
            data={getUniqueValues(['transaction_date', 'delivery_date', 'customer_name', 'name'])}
            handleFilterChange={handleFilterChange}
          />
        </div>
        <Table striped responsive>
          <thead>
            <tr className="text-center">
              {headers?.length > 0 &&
                headers.map((header: any) => (
                  <th scope="col" className={stylesListing.table_header}>
                    {header}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {filteredData?.length > 0 &&
              filteredData.map((data: any, index: any) => {
                return (
                  <>
                    <tr className={`text-center ${stylesListing.table_row}`} key={index}>
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
                      <td>{data?.total_weight?.toFixed(3)}</td>
                      <td>{data.delivery_date}</td>
                      <td>{data.status}</td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default ListingTable;
