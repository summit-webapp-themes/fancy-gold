import Image from 'next/image';
import image from '../../../public/assets/images/no_data_image.png';
import GridViewLoadingComponent from './GridViewLoadingComponent';
import ProductsGridView from './ProductsGridView';
import { useState } from 'react';

const ProductGridViewMaster = ({ productListingData, isLoading, handlePaginationBtn, productListTotalCount }: any) => {
  const [pageOffset, setpageOffset] = useState(0);
  const handlePageClick = (event: any) => {
    handlePaginationBtn(event?.selected);
    setpageOffset(event?.selected);
  };
  const handleDataRendering = () => {
    if (isLoading) {
      return (
        <div className="row justify-content-center">
          {[...Array(10)].map(() => (
            <>
              <div className="col-sm-6 col-lg-5 col-xl-4 col-xxl-3 text-center mb-3">
                <GridViewLoadingComponent />
              </div>
            </>
          ))}
        </div>
      );
    }
    if (productListingData?.length > 0) {
      return (
        <ProductsGridView
          productListingData={productListingData}
          handlePageClick={handlePageClick}
          productListTotalCount={productListTotalCount}
          pageOffset={pageOffset}
        />
      );
    }
    if (productListingData?.length === 0) {
      return (
        <div className="text-center">
          <div className="p-3" style={{ fontSize: '40px' }}>
            <Image src={image} width={250} height={250} alt="Error Image" />
          </div>
          <div className="text-center">
            <h2 className="theme-blue">Sorry, No Data Found</h2>
          </div>
        </div>
      );
    }
  };
  return <>{handleDataRendering()}</>;
};

export default ProductGridViewMaster;
