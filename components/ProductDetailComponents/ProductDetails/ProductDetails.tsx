import React from 'react';
import ProductDetailInfo from '../ProductDetailDrawer/ProductDetailInfo';
import ProductImage from './ProductImage';
import ProductCode from './ProductCode';

const ProductDetails = ({ productDetailData }: any) => {
  return (
    <div className="container d-flex border">
      <div className="p-3">
        <ProductImage image={productDetailData?.image} />
      </div>
      <div className="p-3 w-100">
        <ProductCode data={productDetailData}/>
        <ProductDetailInfo data={productDetailData} />
      </div>
    </div>
  );
};

export default ProductDetails;
