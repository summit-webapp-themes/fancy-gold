import React from 'react';
import Image from 'next/image';
import ProductsGridView from './ProductsGridView';
import GridViewLoadingComponent from './GridViewLoadingComponent';
import image from '../../../public/assets/images/no_data_image.jpg';

const ProductGridViewMaster = ({ productListingData, isLoading, handlePaginationBtn }: any) => {
  const handleDataRendering = () => {
    if (isLoading) {
      return (
        <div className="row justify-content-center">
          {[...Array(10)].map(() => (
            <>
              <div className="col-md-3 col-lg-3 mb-3 mx-2 px-0">
                <GridViewLoadingComponent />
              </div>
            </>
          ))}
        </div>
      );
    }
    if (productListingData?.length > 0) {
      return <ProductsGridView productListingData={productListingData} handlePaginationBtn={handlePaginationBtn} />;
    }
    if (productListingData?.length === 0) {
      return (
        <div className="text-center">
          <div className="p-3" style={{ fontSize: '40px' }}>
            <Image src={image} width={250} height={250} alt="Error Image" />
          </div>
          <div className="text-center">
            <h2 className='theme-blue'>Sorry, No Data Found</h2>
          </div>
        </div>
      );
    }
  };
  return (
    <div className="row">
      <div className={'col-lg-12 px-0'}>
        <div className="row">{handleDataRendering()}</div>
      </div>
    </div>
  );
};

export default ProductGridViewMaster;
