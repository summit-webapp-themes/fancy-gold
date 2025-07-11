import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import useProductListing from '../../hooks/ProductListPageHooks/useProductsDataHook';
import { selectCart } from '../../store/slices/cart-slices/cart-local-slice';
import { selectReferenceTracker } from '../../store/slices/reference-tracking-slices/reference-tracking-slice';
import { selectWishlist } from '../../store/slices/wishlist-slices/wishlist-local-slice';
import styles from '../../styles/components/filterSidebar.module.scss';
import WebFilters from './FilterView/WebFilters';
import HorizontalFilter from './HorizontalFilterList.tsx/HorizontalFilter';
import ImagePreviewModal from './ProductGridView/ImagePreviewModal';
const ProductCardSkeleton = dynamic(() => import('./../../cards/ProductCardSkeleton'));
const ProductGridViewMaster = dynamic(() => import('./ProductGridView/ProductGridViewMaster'));
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
  const cartData = useSelector(selectCart)?.items;
  const referenceTrackerData = useSelector(selectReferenceTracker);
  const [hideFilterSection, setHideFilterSection] = useState<boolean>(false);
  const [show, setShow] = useState(false);

  const [imagePreview, setImagePreview] = useState(false);
  const [previewData, setPreviewData] = useState([]);

  const handlePreviewModal = (data: any) => {
    setImagePreview(true);
    setPreviewData(data);
  };
  const [drawerData, setDrawerData] = useState({ productName: '', variantOf: '', slug: '' });

  const handleClose = () => {
    setDrawerData({ productName: '', variantOf: '', slug: '' });
    setShow(false);
  };
  const handleShow = (productName: string, variantOf: string, slug: string) => {
    setDrawerData((prev: any) => ({ ...prev, productName: productName, variantOf: variantOf, slug: slug }));
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
        cartData={cartData}
        handlePreviewModal={handlePreviewModal}
      />
    );
  };
  return (
    <div>
      <section className="listing-page ">
        <HorizontalFilter sortBy={sortBy} handleSortBy={handleSortBy} />
        <div className="container-fuild w-100">
          <div className="row m-0 px-lg-3 ps-xl-5 pe-xl-4 ps-0 w-100">
            <div className="col-12 col-sm-4 col-md-4 col-lg-2">
              <WebFilters
                searchFilterValue={searchFilterValue}
                handleFilterSearchFun={handleFilterSearchFun}
                handleFilterSearchBtn={handleFilterSearchBtn}
                hideFilterSection={hideFilterSection}
                setHideFilterSection={setHideFilterSection}
              />
            </div>

            <div className=" col-lg-10 col-md-8 col-sm-8">
              <div className="row mt-2 mt-sm-0 product-listing-row pe-lg-0" style={{ paddingRight: '12px'}}>{handleDisplayOfProductsList()}</div>
            </div>
          </div>
        </div>
        <ImagePreviewModal imagePreview={imagePreview} setImagePreview={setImagePreview} data={previewData} />
        <ProductDetailDrawer show={show} handleClose={handleClose} data={drawerData} referenceTrackerData={referenceTrackerData} />
      </section>
    </div>
  );
};
export default ProductListingMaster;
