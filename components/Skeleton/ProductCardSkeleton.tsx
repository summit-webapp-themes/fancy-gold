import React from 'react';
import Skeleton from '@mui/material/Skeleton';

const ProductCardSkeleton = () => {
  return (
    <>
      <div className="row justify-content-center m-0">
        <Skeleton variant="rectangular" width={250} height={200} animation="wave" />
        <div className="d-flex justify-content-center">
          <Skeleton width={130} height={30} animation="wave" />
        </div>
        <div className="d-flex justify-content-center">
          <Skeleton width={110} height={25} animation="wave" />
        </div>
        <div className="d-flex justify-content-center">
          <Skeleton width={90} height={25} animation="wave" />
        </div>
        <div className="d-flex justify-content-center">
          <Skeleton width={140} height={45} animation="wave" />
        </div>
      </div>
    </>
  );
};

export default ProductCardSkeleton;
