import NoDataFound from '../../NoDataFound';
import DrawerSkeleton from '../ProductDetailDrawer/DrawerSkeleton';
import ImageSkeleton from '../ProductDetailDrawer/ImageSkeleton';
import ProductDetailInfo from '../ProductDetailDrawer/ProductDetailInfo';
import ProductCode from './ProductCode';
import ProductImage from './ProductImage';
import ProductVariants from './ProductVariants';

const ProductDetails = ({
  productDetailData,
  productVariantData,
  fetchProductDetailDataAPI,
  errorMessage,
  variantLoading,
  isLoading,
}: any) => {
  const handledataRendering = () => {
    if (isLoading) {
      return (
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-5 p-3">
            <ImageSkeleton />
          </div>
          <div className="col-12 col-md-12 col-sm-12 col-lg-7">
            <div className="p-3 w-100">
              <DrawerSkeleton />
            </div>
          </div>
        </div>
      );
    }
    if (Object.keys(productDetailData).length !== 0) {
      return (
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-5 p-3">
            <ProductImage image={productDetailData?.image} />
          </div>
          <div className="col-12 col-md-12 col-sm-12 col-lg-7">
            <div className="p-3 w-100">
              <ProductCode data={productDetailData} />
              <ProductVariants
                productDetail={productDetailData}
                variantsData={productVariantData?.variants?.length > 0 && productVariantData?.variants}
                attributesData={productVariantData?.attributes?.length > 0 && productVariantData?.attributes}
                getProductDetailData={fetchProductDetailDataAPI}
                errorMessage={errorMessage}
                loading={variantLoading}
              />
              <ProductDetailInfo data={productDetailData} getProductDetailData={fetchProductDetailDataAPI} />
            </div>
          </div>
        </div>
      );
    }
    if(Object.keys(productDetailData).length === 0 && !isLoading){
      return(

        <NoDataFound title="Details Not Found!" message="Sorry for inconvenience. Please try again later." />
      )
    }
  };
  return <div className="container ">{handledataRendering()}</div>;
};

export default ProductDetails;
