<<<<<<< HEAD
import React from 'react';
import ProductListViewMaster from './ProductListView/ProductListViewMaster';
import useProductListing from '../../hooks/product-listing-hooks/product-listing-hook';
import ProductsListView from './ProductListView/ProductsListView';
import ProductsGridView from './ProductGridView/ProductsGridView';
import WebFilters from './FilterView/WebFilters';
import ProductGridViewMaster from './ProductGridView/ProductGridViewMaster';

const ProductListingMaster = () => {
  const { toggleProductListView } = useProductListing();

  const handleDisplayOfProductsList = () => {
    switch (toggleProductListView) {
      case 'list-view':
        return <ProductsListView />;
      case 'grid-view':
        return <ProductsGridView />;

      default:
        break;
    }
  };

  return (
    <div className="margin_from_nav_cart">
      <section className="listing-page ">
        <div className="container">
          <div className="row mt-2 ms-3 product-listing-row">
            <span className="col-lg-3 col-md-4 handle_display_web_filter">
              <WebFilters />
            </span>
            <div className="col-lg-9 col-md-8">
              <ProductGridViewMaster />
              {/* <ProductListViewMaster /> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductListingMaster;
=======
import React from 'react'

const ProductListingMaster = () => {
  return (
    <div>ProductListingMaster</div>
  )
}

export default ProductListingMaster
>>>>>>> upstream/develop
