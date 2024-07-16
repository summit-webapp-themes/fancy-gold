import ReactPaginate from 'react-paginate';
import ProductCard from '../../../cards/ProductCard';

const ProductsGridView = ({ productListingData,handlePageClick,productListTotalCount,pageOffset }: any) => {
  const isNextButtonDisabled: any =
    productListTotalCount > productListingData ||
    productListTotalCount === productListingData;
  return (
    <>
      {productListingData.map((item: any, index: any) => (
        <div key={index} className="col-sm-6 col-lg-5 col-xl-4 col-xxl-3 text-center mb-3">
          <ProductCard data={item} />
        </div>
      ))}
      <ReactPaginate
          previousLabel={'Prev'}
          nextLabel={'Next'}
          pageCount={productListTotalCount / 12}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={'paginationBttns'}
          previousLinkClassName={'previousBttn'}
          disabledClassName={'paginationDisabled'}
          nextLinkClassName={
            isNextButtonDisabled ? "paginationDisabled" : "nextBttn"
          }
          activeClassName={'paginationActive'}
          forcePage={pageOffset}
        />
    </>
  );
};

export default ProductsGridView;
