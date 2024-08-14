import { useState } from 'react';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import useProductListing from '../../hooks/ProductListPageHooks/useProductsDataHook';
import { selectWishlist } from '../../store/slices/wishlist-slices/wishlist-local-slice';
import WebFilters from './FilterView/WebFilters';
import HorizontalFilter from './HorizontalFilterList.tsx/HorizontalFilter';
const ProductCardSkeleton = dynamic(() => import('./../../cards/ProductCardSkeleton'));
const ProductGridViewMaster = dynamic(() => import('./ProductGridView/ProductGridViewMaster'), { loading: () => <ProductCardSkeleton /> });
const ProductDetailDrawer = dynamic(() => import('../ProductDetailComponents/ProductDetailDrawer/ProductDetailDrawer'));
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
  const wishlistData = useSelector(selectWishlist)?.items;
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
        wishlistData={wishlistData}
      />
    );
  };
  return (
    <div>
      <section className="listing-page ">
        <HorizontalFilter sortBy={sortBy} handleSortBy={handleSortBy} />
        <div className="container-fuild">
          <div className="row  ps-lg-5 pe-lg-4">
            <div className="col-12 col-sm-4 col-md-3 col-lg-2">
              <WebFilters
                searchFilterValue={searchFilterValue}
                handleFilterSearchFun={handleFilterSearchFun}
                handleFilterSearchBtn={handleFilterSearchBtn}
                hideFilterSection={hideFilterSection}
                setHideFilterSection={setHideFilterSection}
              />
            </div>

            <div className="container-md col-lg-10 col-md-8 col-sm-8">
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
