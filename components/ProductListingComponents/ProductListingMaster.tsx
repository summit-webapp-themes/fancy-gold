import useProductListing from '../../hooks/product-listing-hooks/product-listing-hook';
import HorizontalFilter from './HorizontalFilterList.tsx/HorizontalFilter';
import WebFilters from './FilterView/WebFilters';
import ProductGridViewMaster from './ProductGridView/ProductGridViewMaster';

const ProductListingMaster = () => {
  const { productListingData, isLoading, handlePaginationBtn, productListTotalCount, sortBy, handleSortBy } = useProductListing();

  const handleDisplayOfProductsList = () => {
    return (
      <ProductGridViewMaster
        productListingData={productListingData}
        isLoading={isLoading}
        handlePaginationBtn={handlePaginationBtn}
        productListTotalCount={productListTotalCount}
      />
    );
  };

  return (
    <div>
      <section className="listing-page ">
        <HorizontalFilter sortBy={sortBy} handleSortBy={handleSortBy} />
        <div className="container-fuild">
          <div className="d-flex ps-lg-5 pe-lg-4">
            <div id="sidebar" className=" handle_display_web_filter p-3">
              <WebFilters />
            </div>
            <div className="container">
              <div className="row mt-2 product-listing-row ">{handleDisplayOfProductsList()}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default ProductListingMaster;
