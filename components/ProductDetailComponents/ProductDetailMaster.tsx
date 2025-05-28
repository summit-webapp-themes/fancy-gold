import { useSelector } from 'react-redux';
import useProductDetail from '../../hooks//ProductDetailPageHooks/useProductDetail';
import HorizontalFilter from '../ProductListingComponents/HorizontalFilterList.tsx/HorizontalFilter';
import ProductDetails from './ProductDetails/ProductDetails';
import { selectReferenceTracker } from '../../store/slices/reference-tracking-slices/reference-tracking-slice';

const ProductDetailMaster = () => {
  const referenceTrackerData = useSelector(selectReferenceTracker);

  const { productDetailData, productVariantData, fetchProductDetailDataAPI, errorMessage, variantLoading, isLoading } = useProductDetail();

  return (
    <div>
      <section>
        <HorizontalFilter />
        <ProductDetails
          productDetailData={productDetailData}
          productVariantData={productVariantData}
          fetchProductDetailDataAPI={fetchProductDetailDataAPI}
          errorMessage={errorMessage}
          variantLoading={variantLoading}
          isLoading={isLoading}
          referenceTrackerData={referenceTrackerData}
        />
      </section>
    </div>
  );
};

export default ProductDetailMaster;
