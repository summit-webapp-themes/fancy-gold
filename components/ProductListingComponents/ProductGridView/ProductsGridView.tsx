import React from 'react';
import GridViewLoadingComponent from './GridViewLoadingComponent';

const ProductsGridView = () => {
  return (
    <div className={'col-lg-12 px-0'}>
      <div className="row">
        <div className="row justify-content-center">
          {[...Array(10)].map(() => (
            <>
              <div className="col-md-3 col-lg-2 mb-3 mx-2 px-0">
                <GridViewLoadingComponent />
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsGridView;
