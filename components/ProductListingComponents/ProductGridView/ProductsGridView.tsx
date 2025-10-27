import ReactPaginate from 'react-paginate';
import ProductCard from '../../../cards/ProductCard';
import paginationStyle from '../../../styles/components/pagination.module.scss';
import Pagination from '../../Paginate/Pagination';

const ProductsGridView = ({
  productListingData,
  handlePageClick,
  productListTotalCount,
  pageOffset,
  handleShow,
  wishlistData,
  cartData,
  sortBy,
}: any) => {
  const isNextButtonDisabled: boolean = parseInt((productListTotalCount / 12).toString(), 10) === pageOffset;
  return (
    <>
      {productListingData.map((item: any, index: any) => (
        <div key={index} className="col-sm-6 col-lg-4 col-xl-3 col-xxl-3 text-center mb-4">
          <ProductCard
            data={item}
            handleShow={handleShow}
            wishlistData={wishlistData}
            btnAction={'Add'}
            cartData={cartData}
            index={index}
            sortBy={sortBy}
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
