import useProductDetail from '../../hooks//ProductDetailPageHooks/useProductDetail';
import HorizontalFilter from '../ProductListingComponents/HorizontalFilterList.tsx/HorizontalFilter';
import ProductDetails from './ProductDetails/ProductDetails';

const ProductDetailMaster = () => {
  const { productDetailData, productVariantData, fetchProductDetailDataAPI, errorMessage, variantLoading,isLoading } = useProductDetail();

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
        />
      </section>
    </div>
  );
};

export default ProductDetailMaster;
