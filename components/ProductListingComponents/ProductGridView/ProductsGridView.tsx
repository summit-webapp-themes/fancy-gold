import ProductCard from '../../../cards/ProductCard';
import Pagination from '../../Paginate/Pagination';

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
      <Pagination
        totalCount={productListTotalCount}
        handlePageClick={handlePageClick}
        pageOffset={pageOffset}
        isNextButtonDisabled={isNextButtonDisabled}
      />
    </>
  );
};

export default ProductsGridView;
