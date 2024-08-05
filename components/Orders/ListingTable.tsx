import Link from 'next/link';
import React from 'react';
import stylesListing from '../../styles/components/_listingTable.module.scss';

const ListingTable = ({ headers, tableData }: any) => {
  return (
    <>
      <table className="table table-sm table-bordered table-hover">
        <thead>
          <tr className="text-center">{headers?.length > 0 && headers.map((header: any) => <th scope="col">{header}</th>)}</tr>
        </thead>
        <tbody>
          {tableData.length > 0 &&
            tableData.map((data: any, index: any) => {
              return (
                <>
                  <tr className={`text-center ${stylesListing.table_row}`}>
                    <td>
                      <Link href={`/order-details/${data.name}`} className={stylesListing.redirect_name}>
                        {data.name}
                      </Link>
                    </td>
                    <td>{data.transaction_date}</td>
                    <td>{data.status}</td>
                    <td>{data.total_weight}</td>
                    <td>{data.delivery_date}</td>
                    <td>{data.dispatch_weight}</td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default ListingTable;
