import { Box, Skeleton } from '@mui/material';
import React from 'react';

const PuritySkeleton = () => {
  return (
    <div className="row ">
      <div className="col-md-3 col-xxl-2">
        <Skeleton variant="rectangular" width="100%" height="40" />
      </div>
      <div className="col-md-7 col-xxl-8">
        <Skeleton variant="rectangular" width="100%" height="40" />
      </div>
      <div className="col-md-2 col-xxl-2">
        <Skeleton variant="rectangular" width="100%" height="40" />
      </div>
    </div>
  );
};

export default PuritySkeleton;
