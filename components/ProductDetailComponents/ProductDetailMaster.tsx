import React from 'react';
import HorizontalFilter from '../ProductListingComponents/HorizontalFilterList.tsx/HorizontalFilter';
import ProductDetails from './ProductDetails/ProductDetails';
import useProductDetail from '../../hooks/ProductDetailHook/product-detail-hook';

const ProductDetailMaster = () => {
  const { productDetailData, productVariantData, fetchProductDetailDataAPI } = useProductDetail();
  console.log(productDetailData, productVariantData, 'productData');
  return (
    <div>
      <section>
        <HorizontalFilter />
        <ProductDetails productDetailData={productDetailData} productVariantData={productVariantData} fetchProductDetailDataAPI={fetchProductDetailDataAPI} />
      </section>
    </div>
  );
};

export default ProductDetailMaster;
