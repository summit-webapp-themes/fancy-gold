import React, { useEffect } from 'react';
import useProductListing from '../../hooks/product-listing-hooks/product-listing-hook';
import ProductListViewMaster from './ProductListView/ProductListViewMaster';
import WebFilters from './FilterView/WebFilters';
import ProductGridViewMaster from './ProductGridView/ProductGridViewMaster';

const ProductListingMaster = () => {
  const { toggleProductListView, handleToggleProductsListingView, productListingData, isLoading, handlePaginationBtn } = useProductListing();
  useEffect(() => {
    handleToggleProductsListingView('grid-view');
  }, []);
  const handleDisplayOfProductsList = () => {
    switch (toggleProductListView) {
      case 'list-view':
        return <ProductListViewMaster />;
      case 'grid-view':
        return <ProductGridViewMaster productListingData={productListingData} isLoading={isLoading} handlePaginationBtn={handlePaginationBtn} />;

      default:
        return <ProductGridViewMaster productListingData={productListingData} isLoading={isLoading} handlePaginationBtn={handlePaginationBtn} />;
    }
    const handleDisplayOfProductsList = () => {
      return <ProductGridViewMaster />;
    };

    return (
      <div className="mt-5">
        <section className="listing-page ">
          <div className="container">
            <div className="row mt-2 product-listing-row">
              <span className="col-lg-2 col-md-4 handle_display_web_filter">
                <WebFilters />
              </span>
              <div className="col-lg-9 col-md-8 ms-5">{handleDisplayOfProductsList()}</div>
            </div>
          </div>
        </section>
      </div>
    );
  };
};
export default ProductListingMaster;
