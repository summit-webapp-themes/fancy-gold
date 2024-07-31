import Image from 'next/image';
import { useRouter } from 'next/router';
import image from '../../../public/assets/images/no-data.svg';
import ProductsGridView from './ProductsGridView';
import NoDataStyles from '../../../styles/components/noData.module.scss';
import ProductCardSkeleton from '../../../cards/ProductCardSkeleton';

const ProductGridViewMaster = ({ productListingData, isLoading, handlePaginationBtn, productListTotalCount }: any) => {
  const {query}=useRouter()
  const pageOffset = Number(query?.page)-1
  const handlePageClick = (event: any) => {
    handlePaginationBtn(event?.selected);
    
  };
  const handleDataRendering = () => {
    if (isLoading) {
      return (
        <div className="row ">
          {[...Array(10)].map(() => (
            <>
              <div className="col-md-3 col-lg-3 col-sm-6 mb-3 p-1">
                <ProductCardSkeleton />
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
        <div className={`text-center ${NoDataStyles.no_data_image}`}>
          <div className="p-3" style={{ fontSize: '40px' }}>
            <Image src={image} width={200} height={200} alt="Error Image" />
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
