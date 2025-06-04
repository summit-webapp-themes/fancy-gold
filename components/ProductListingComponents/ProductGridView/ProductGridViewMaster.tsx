import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import ProductsGridView from './ProductsGridView';
const ProductCardSkeleton = dynamic(() => import('../../../cards/ProductCardSkeleton'));
const NoDataFound = dynamic(() => import('../../NoDataFound'));

const ProductGridViewMaster = ({
  productListingData,
  isLoading,
  handlePaginationBtn,
  productListTotalCount,
  handleShow,
  wishlistData,
  cartData,
}: any) => {
  const { query } = useRouter();
  const pageOffset = Number(query?.page) - 1;
  const handlePageClick = (event: any) => {
    handlePaginationBtn(event?.selected);
  };
  const handleDataRendering = () => {
    if (isLoading) {
      return (
        <div className="row m-0">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="col-md-3 col-lg-3 col-6 mb-3 px-0">
              <ProductCardSkeleton />
            </div>
          ))}
        </div>
      );
    }
    if (productListingData?.length > 0) {
      return (
        <ProductsGridView
          productListingData={productListingData}
          handlePageClick={handlePageClick}
          productListTotalCount={productListTotalCount}
          pageOffset={pageOffset}
          handleShow={handleShow}
          wishlistData={wishlistData}
          cartData={cartData}

        />
      );
    }
    if (productListingData?.length === 0) {
      return <NoDataFound title="No Record Found !!" message="We couldn't find what you searched for. Try searching again." />;
    }
  };
  return <>{handleDataRendering()}</>;
};

export default ProductGridViewMaster;
