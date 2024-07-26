import React from 'react';
import ProductDetailInfo from '../ProductDetailDrawer/ProductDetailInfo';
import ProductImage from './ProductImage';
import ProductCode from './ProductCode';
import ProductVariants from './ProductVariants';

const ProductDetails = ({ productDetailData, productVariantData, fetchProductDetailDataAPI }: any) => {
  return (
    <div className="container ">
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
            />
            <ProductDetailInfo data={productDetailData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
