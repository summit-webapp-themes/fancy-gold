import React from 'react';
import useProductDetail from '../../hooks/ProductDetailHook/product-detail-hook';
import HorizontalFilter from '../ProductListingComponents/HorizontalFilterList.tsx/HorizontalFilter';
import ProductDetails from './ProductDetails/ProductDetails';

const ProductDetailMaster = () => {
  const { productDetailData, productVariantData } = useProductDetail();
  return (
    <div>
      <section>
        <HorizontalFilter />
        <ProductDetails
          productDetailData={productDetailData}
          productVariantData={productVariantData}
        />
      </section>
    </div>
  );
};

export default ProductDetailMaster;
