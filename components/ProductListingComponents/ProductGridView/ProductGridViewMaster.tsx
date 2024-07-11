import React from 'react';
import ProductsGridView from './ProductsGridView';
import GridViewLoadingComponent from './GridViewLoadingComponent';

const ProductGridViewMaster = ({productListingData,isLoading}:any) => {
  const handleDataRendering =()=>{
    if(isLoading){
      return(
        <div className="row justify-content-center">
          {[...Array(10)].map(() => (
            <>
              <div className="col-md-3 col-lg-2 mb-3 mx-2 px-0">
                <GridViewLoadingComponent />
              </div>
            </>
          ))}
        </div>
      )
    } else if (productListingData?.length > 0){
      return(
        <ProductsGridView productListingData={productListingData}/>
      )
    }
  }
  return (
    <div className="row">
      <div className={'col-lg-12 px-0'}>
      <div className="row">
        {handleDataRendering()}
      </div>
    </div>
    </div>
  );
};

export default ProductGridViewMaster;
