import React, { useEffect } from 'react';
import useProductListing from '../../hooks/ProductListPageHooks/useProductsDataHook';
import ProductListViewMaster from './ProductListView/ProductListViewMaster';
import WebFilters from './FilterView/WebFilters';
import ProductGridViewMaster from './ProductGridView/ProductGridViewMaster';

const ProductListingMaster = () => {
  const { productListingData, isLoading, handlePaginationBtn } = useProductListing();

  const handleDisplayOfProductsList = () => {
    return (
      <ProductGridViewMaster productListingData={productListingData} isLoading={isLoading} handlePaginationBtn={handlePaginationBtn} />
    );
  };

  return (
    <div className="mt-5">
      <section className="listing-page ">
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


