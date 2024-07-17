import React from 'react';
import ProductDetail from './ProductDetails/ProductDetail';
import BreadCrumbs from './ProductDetails/BreadCrumbs';
import PuritySkeleton from '../Skeleton/PuritySkeleton';
import ProductDetailSkeleton from '../Skeleton/ProductDetailSkeleton';

const ProductDetailMaster = () => {
  return (
    <div className="container-fuild">
      <div className="row ps-lg-5 pe-lg-4 m-0">
        <div className="col-12 my-3">
          <PuritySkeleton />
        </div>
        <div className="col-12">
          <ProductDetailSkeleton />
          <ProductDetail />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailMaster;
