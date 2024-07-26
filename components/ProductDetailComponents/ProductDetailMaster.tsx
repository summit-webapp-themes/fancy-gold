import React from 'react';
import useProductDetail from '../../hooks/ProductDetailHook/product-detail-hook';
import HorizontalFilter from '../ProductListingComponents/HorizontalFilterList.tsx/HorizontalFilter';
import ProductDetails from './ProductDetails/ProductDetails';

const ProductDetailMaster = () => {
  const { productDetailData, productVariantData, fetchProductDetailDataAPI } = useProductDetail();
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
