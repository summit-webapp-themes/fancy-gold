import NoDataFound from '../../NoDataFound';
import DrawerSkeleton from '../ProductDetailDrawer/DrawerSkeleton';
import ImageSkeleton from '../ProductDetailDrawer/ImageSkeleton';
import ProductDetailInfo from '../ProductDetailDrawer/ProductDetailInfo';
import PrevNextButtons from './PrevNextButtons';
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
  referenceTrackerData,
}: any) => {
  const handledataRendering = () => {
    if (isLoading) {
      return (
        <div className="row">
          <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-3">
            <ImageSkeleton />
          </div>
          <div className="col-12 col-md-12 col-sm-12 col-lg-6">
            <div className="p-3 w-100">
              <DrawerSkeleton />
            </div>
          </div>
        </div>
      );
    }
    if (Object.keys(productDetailData).length !== 0) {
      return (
        <div className="row ">
          <div className="col-12 col-md-6 pb-3 pb-lg-0">
            <ProductImage Imageslideshow={productDetailData?.slide_img} />
          </div>
          <div className="col-12 col-md-6 ">
            <div className="p-2 p-md-3 w-100 border">
              <ProductCode data={productDetailData} />
              <ProductVariants
                productDetail={productDetailData}
                variantsData={productVariantData?.variants?.length > 0 && productVariantData?.variants}
                attributesData={productVariantData?.attributes?.length > 0 && productVariantData?.attributes}
                getProductDetailData={fetchProductDetailDataAPI}
                errorMessage={errorMessage}
                loading={variantLoading}
              />
              <ProductDetailInfo
                data={productDetailData}
                getProductDetailData={fetchProductDetailDataAPI}
                referenceTrackerData={referenceTrackerData}
              />
            </div>
            <PrevNextButtons data={productDetailData} />
          </div>
        </div>
      );
    }
    if (Object.keys(productDetailData).length === 0 && !isLoading) {
      return <NoDataFound title="Details Not Found!" message="Sorry for inconvenience. Please try again later." />;
    }
  };
  return <div className="container-xl ">{handledataRendering()}</div>;
};

export default ProductDetails;
