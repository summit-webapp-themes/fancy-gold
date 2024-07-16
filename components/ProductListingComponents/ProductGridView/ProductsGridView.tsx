import ReactPaginate from 'react-paginate';
import ProductCard from '../../../cards/ProductCard';

const ProductsGridView = ({ productListingData,handlePaginationBtn,productListTotalCount }: any) => {
  return (
    <>
      {productListingData.map((item: any, index: any) => (
        <div key={index} className="col-xl-3 col-lg-4 col-md-4 mb-2">
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
