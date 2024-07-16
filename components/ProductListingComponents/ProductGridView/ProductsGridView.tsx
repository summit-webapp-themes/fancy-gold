import ReactPaginate from 'react-paginate';
import ProductCard from '../../../cards/ProductCard';

const ProductsGridView = ({ productListingData,handlePaginationBtn,productListTotalCount }: any) => {
  return (
    <>
      {productListingData.map((item: any, index: any) => (
        <div key={index} className="col-sm-6 col-lg-5 col-xl-4 col-xxl-3 text-center mb-3">
          <ProductCard data={item} />
        </div>
      ))}
      <ReactPaginate
          previousLabel={'Prev'}
          nextLabel={'next'}
          pageCount={productListTotalCount / 12}
          pageRangeDisplayed={3}
          onPageChange={handlePaginationBtn}
          containerClassName={'paginationBttns'}
          previousLinkClassName={'previousBttn'}
          disabledClassName={'paginationDisabled'}
          nextLinkClassName={'nextBttn'}
          activeClassName={'paginationActive'}
          // forcePage={pageOffset}
        />
    </>
  );
};

export default ProductsGridView;
