import { Box, Card, CardContent, CardMedia, Skeleton, Typography } from '@mui/material';
import React from 'react';

const ProductDetailSkeleton = () => {
  return (
    <div className="row">
      <div className="col-md-4 ">
        <Card className="h-100">
          <CardMedia>
            <Skeleton variant="rectangular" width="100%" height="32rem" />
          </CardMedia>
        </Card>
      </div>
      <div className="col-md-8 ">
        <Card className="h-100 m-0  p-0">
          <CardContent>
            <Skeleton variant="rectangular" width="100%" height={198} />
            <Skeleton width="100%" height={80} />
            <Skeleton width="100%" height={50} />
            <Skeleton width="90%" height={30} />
            <Skeleton width="80%" height={30} />
            <Skeleton width="70%" height={30} />
            <Box display="flex" alignItems="center" mt={2}>
              <Skeleton variant="rectangular" width={100} height={30} className="me-3" />
              <Skeleton variant="rectangular" width={60} height={30} />
            </Box>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
