import React from 'react';
import ListViewLoadingComponent from './ListViewLoadingComponent';

const ProductsListView = () => {
  return (
    <div>
      <div className={'col-lg-12 px-0'}>
        <div className="row">
          <div className="row justify-content-center mb-3">
            {[...Array(5)].map(() => (
              <>
                <ListViewLoadingComponent />
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsListView;
