import React from 'react';
import GridViewLoadingComponent from './GridViewLoadingComponent';
import ProductCardSkeleton from '../../Skeleton/ProductCardSkeleton';

const ProductsGridView = () => {
  return (
    <div className={'col-lg-12 px-0'}>
      <div className="row">
        <div className="row justify-content-center">
          {[...Array(12)].map(() => (
            <>
              <div className="col-md-3 col-lg-3 mb-3 px-0">
                <ProductCardSkeleton />
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsGridView;
