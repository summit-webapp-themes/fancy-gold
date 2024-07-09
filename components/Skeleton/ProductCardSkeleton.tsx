import React from 'react';
import Skeleton from '@mui/material/Skeleton';

const ProductCardSkeleton = () => {
  return (
    <>
      <div className="row justify-content-center m-0">
        <Skeleton variant="rectangular" width={240} height={230} animation="wave" />
      </div>
      <div className="row justify-content-center mt-2 m-0">
        <div className="col-lg-5">
          <Skeleton width={110} height={30} animation="wave" />
          <Skeleton width={90} height={30} animation="wave" />
          <Skeleton width={70} height={30} animation="wave" />
        </div>
        <div className="col-lg-3 text-end">
          <Skeleton width={70} height={39} animation="wave" />
          <div className="mt-2">
            <Skeleton width={70} height={34} animation="wave" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCardSkeleton;
