import React, { useState } from 'react';
import useProductListing from '../../hooks/product-listing-hooks/product-listing-hook';
import HorizontalFilter from './HorizontalFilterList.tsx/HorizontalFilter';
import WebFilters from './FilterView/WebFilters';
import ProductGridViewMaster from './ProductGridView/ProductGridViewMaster';
import ProductDetailDrawer from '../ProductDetailComponents/ProductDetailDrawer/ProductDetailDrawer';

const ProductListingMaster = () => {
  const {
    productListingData,
    isLoading,
    handlePaginationBtn,
    productListTotalCount,
    sortBy,
    handleSortBy,
    handleFilterSearchFun,
    handleFilterSearchBtn,
    searchFilterValue,
  } = useProductListing();

  const [hideFilterSection, setHideFilterSection] = useState<boolean>(false);

  const [show, setShow] = useState(false);
  const [drawerData, setDrawerData] = useState({ productName: '', variantOf: '' });

  const handleClose = () => {
    setDrawerData({ productName: '', variantOf: '' });
    setShow(false);
  };
  const handleShow = (productName: string, variantOf: string) => {
    setDrawerData((prev: any) => ({ ...prev, productName: productName, variantOf: variantOf }));
    setShow(true);
  };

  const handleDisplayOfProductsList = () => {
    return (
      <ProductGridViewMaster
        productListingData={productListingData}
        isLoading={isLoading}
        handlePaginationBtn={handlePaginationBtn}
        productListTotalCount={productListTotalCount}
        handleShow={handleShow}
      />
    );
  };
  return (
    <div>
      <section className="listing-page ">
        <HorizontalFilter sortBy={sortBy} handleSortBy={handleSortBy} />
        <div className="container-fuild">
          <div className="row  ps-lg-5 pe-lg-4">
            <div className="col-12 col-sm-4 col-md-4 col-lg-3 ">
              <WebFilters
                searchFilterValue={searchFilterValue}
                handleFilterSearchFun={handleFilterSearchFun}
                handleFilterSearchBtn={handleFilterSearchBtn}
                hideFilterSection={hideFilterSection}
                setHideFilterSection={setHideFilterSection}
              />
            </div>

            <div className="container-md col-lg-9 col-md-6 col-sm-8">
              <div className="row mt-2 product-listing-row">{handleDisplayOfProductsList()}</div>
            </div>
          </div>
        </div>
        <ProductDetailDrawer show={show} handleClose={handleClose} data={drawerData} />
      </section>
    </div>
  );
};
export default ProductListingMaster;
