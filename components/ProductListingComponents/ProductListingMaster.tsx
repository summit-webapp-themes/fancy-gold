import React, { useEffect, useState } from 'react';
import WebFilters from './FilterView/WebFilters';
import ProductGridViewMaster from './ProductGridView/ProductGridViewMaster';
import useProductListing from '../../hooks/product-listing-hooks/product-listing-hook';

const ProductListingMaster = () => {
  const { productListingData, isLoading, handlePaginationBtn } = useProductListing();
  const [hideFilterSection, setHideFilterSection] = useState<boolean>(false);

  const handleDisplayOfProductsList = () => {
    return <ProductGridViewMaster productListingData={productListingData} isLoading={isLoading} handlePaginationBtn={handlePaginationBtn} />;
  };

  return (
    <div className="mt-5">
      <section className="listing-page">
        <div className="container-fuild">
          <div className="d-flex ps-lg-5 pe-lg-4">
            <div>
              <WebFilters hideFilterSection={hideFilterSection} setHideFilterSection={setHideFilterSection} />
            </div>

            <div className="container">
              <div className="row mt-2 product-listing-row">{handleDisplayOfProductsList()}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default ProductListingMaster;
