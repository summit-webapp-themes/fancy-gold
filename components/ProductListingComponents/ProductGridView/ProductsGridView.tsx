import ReactPaginate from 'react-paginate';
import ProductCard from '../../../cards/ProductCard';
import paginationStyle from '../../../styles/components/pagination.module.scss';

const ProductsGridView = ({
  productListingData,
  handlePageClick,
  productListTotalCount,
  pageOffset,
  handleShow,
  wishlistData,
  cartData,
  handlePreviewModal,
}: any) => {
  const isNextButtonDisabled: boolean = parseInt((productListTotalCount / 12).toString(), 10) === pageOffset;
  return (
    <>
      {productListingData.map((item: any, index: any) => (
        <div key={index} className="col-6 col-lg-4 col-xl-3 col-xxl-3 text-center mb-3 mb-md-4 p-end">
          <ProductCard
            data={item}
            handleShow={handleShow}
            wishlistData={wishlistData}
            btnAction={'Add'}
            cartData={cartData}
            handlePreviewModal={handlePreviewModal}
          />
        </div>
      ))}
      <ReactPaginate
        previousLabel={'Prev'}
        nextLabel={'Next'}
        pageCount={Math.ceil(productListTotalCount / 12)}
        pageRangeDisplayed={0}
        marginPagesDisplayed={1}
        onPageChange={handlePageClick}
        containerClassName={`${paginationStyle.paginationBttns}`}
        previousLinkClassName={pageOffset === 0 ? paginationStyle.paginationDisabled : paginationStyle.previousBttn}
        disabledClassName={paginationStyle.paginationDisabled}
        nextLinkClassName={isNextButtonDisabled ? paginationStyle.paginationDisabled : `${paginationStyle.nextBttn}`}
        activeClassName={`${paginationStyle.paginationActive}`}
        forcePage={pageOffset}
      />
    </>
  );
};

export default ProductsGridView;
