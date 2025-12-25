import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { Table } from 'react-bootstrap';
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';
import stylesListing from '../../styles/components/_listingTable.module.scss';
import Pagination from '../Paginate/Pagination';
import OrderListFilter from './OrderListFilters';

const ListingTable = ({
  headers,
  tableData,
  filters,
  setFilters,
  filterOptions,
  handleSelectOrder,
  handleDeleteOrder,
  handlePaginationBtn,
  orderListTotalCount,
}: any) => {
  const router = useRouter();
  const pageOffset = Number(router?.query?.page) - 1 || 0;

  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: string) => {
    if (!key) return;
    setSortOrder((prev) => (sortKey === key && prev === 'asc' ? 'desc' : 'asc'));
    setSortKey(key);
  };

  const sortedData = useMemo(() => {
    if (!sortKey) return tableData;

    return [...tableData].sort((a: any, b: any) => {
      const A = a[sortKey];
      const B = b[sortKey];

      if (typeof A === 'number') {
        return sortOrder === 'asc' ? A - B : B - A;
      }
      return sortOrder === 'asc'
        ? A?.localeCompare(B)
        : B?.localeCompare(A);
    });
  }, [tableData, sortKey, sortOrder]);

  const totalWeight = useMemo(() => {
    return sortedData.reduce(
      (sum: number, item: any) => sum + Number(item.total_weight || 0),
      0
    );
  }, [sortedData]);

  const totalCount = orderListTotalCount || 0;
  const isNextButtonDisabled =
    Math.ceil(totalCount / 12) === pageOffset + 1;

  return (
    <div className="container">
      {/* FILTERS */}
      <OrderListFilter f
        filters={filters}
        setFilters={setFilters}
        filterOptions={filterOptions}
      />

      <div className="text-end my-2">
        <button className="btn btn-secondary" onClick={handleDeleteOrder}>
          Cancel
        </button>
      </div>

      <Table striped responsive>
        <thead>
          <tr className="text-center">
            {headers.map((h: any, i: number) => (
              <th
                key={i}
                className={stylesListing.table_header}
                onClick={() =>
                  handleSort(h.field_name?.toLowerCase())
                }
              >
                {h.header}
                {h.field_name && (
                  <span className="ms-2">
                    {sortKey === h.field_name ? (
                      sortOrder === 'asc' ? <FaSortUp /> : <FaSortDown />
                    ) : (
                      <FaSort />
                    )}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {sortedData.map((row: any) => (
            <tr key={row.name} className="text-center">
              <td>
                <input
                  type="checkbox"
                  onChange={() => handleSelectOrder(row.name)}
                />
              </td>
              <td>{row.transaction_date}</td>
              <td>
                <Link href={`/order-detail/${row.name}`}>
                  {row.name}
                </Link>
              </td>
              <td>{row.customer_name}</td>
              <td>{row.purity}</td>
              <td>{row.total_weight?.toFixed(3)}</td>
              <td>{row.delivery_date}</td>
              <td>{row.status}</td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td colSpan={5}></td>
            <td className="text-center">
              <strong>{totalWeight.toFixed(3)}</strong>
            </td>
            <td colSpan={2}></td>
          </tr>
        </tfoot>
      </Table>

      <Pagination
        totalCount={totalCount}
        handlePageClick={(e: any) =>
          handlePaginationBtn(e.selected)
        }
        pageOffset={pageOffset}
        isNextButtonDisabled={isNextButtonDisabled}
      />
    </div>
  );
};

export default ListingTable;
