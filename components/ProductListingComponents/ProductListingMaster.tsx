import React from 'react';
import ProductListViewMaster from './ProductListView/ProductListViewMaster';
import useProductListing from '../../hooks/product-listing-hooks/product-listing-hook';
import ProductGridViewMaster from './ProductGridView/ProductGridViewMaster';
import FilterViewMaster from './FilterView/FilterViewMaster';

const ProductListingMaster = () => {
  const { toggleProductListView, handleToggleProductsListingView } = useProductListing();

  const handleDisplayOfProductsList = () => {
    switch (toggleProductListView) {
      case 'list-view':
        return <ProductListViewMaster />;
      case 'grid-view':
        return <ProductGridViewMaster />;

      default:
        return <ProductGridViewMaster />;
    }
  };

  return (
    <div className="margin_from_nav_cart">
      <div className="container d-flex justify-content-between w-100  ">
        <div className="w-50"></div>
        <div>
          <div className="row list-toggle-rtl">
            <div className="col-lg-4 col-4 d-flex justify-content-end">
              <div className="ms-3 mob-breadcrum-icon d-flex">
                <div>
                  <i className="fa fa-list fa-lg cursor_pointer" aria-hidden="true" onClick={() => handleToggleProductsListingView('list-view')}></i>
                </div>
                <div>
                  <i className="fa fa-th fa-lg ms-3 cursor_pointer" aria-hidden="true" onClick={() => handleToggleProductsListingView('grid-view')}></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="listing-page ">
        <div className="container">
          <div className="row mt-2 ms-3 product-listing-row">
            <span className="col-lg-3 col-md-4 handle_display_web_filter">
              <FilterViewMaster/>
            </span>
            <div className="col-lg-9 col-md-8">{handleDisplayOfProductsList()}</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductListingMaster;
