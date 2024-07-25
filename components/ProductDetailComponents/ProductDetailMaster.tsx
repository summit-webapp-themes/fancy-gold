import React from 'react';
import HorizontalFilter from '../ProductListingComponents/HorizontalFilterList.tsx/HorizontalFilter';
import ProductDetails from './ProductDetails/ProductDetails';
import useProductDetail from '../../hooks/ProductDetailHook/product-detail-hook';

const ProductDetailMaster = () => {
  const {productDetailData}=useProductDetail()
  console.log(productDetailData,'productData')
  return <div>
    <section>
      <HorizontalFilter/>
      <ProductDetails productDetailData={productDetailData}/>
    </section>
  </div>;
};

export default ProductDetailMaster;
