import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { CardContent, CardMedia, Typography } from '@mui/material';
import { Card } from 'react-bootstrap';

const ProductCardSkeleton = () => {
  return (
    <>
      <div className="row justify-content-center m-0">
        <CardMedia>
          <Skeleton variant="rectangular" width={220} height={140} animation="wave" />
        </CardMedia>
        <CardContent className="pt-1">
          <Typography variant="h5">
            <Skeleton width="70%" animation="wave" />
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Skeleton width="60%" animation="wave" />
            <Skeleton width="60%" animation="wave" />
          </Typography>
        </CardContent>
      </div>
    </>
  );
};

export default ProductCardSkeleton;
