import React from 'react';
// import Skeleton from '@mui/material/Skeleton';
// import { CardContent, CardMedia, Typography } from '@mui/material';
import { Card } from 'react-bootstrap';

const ProductCardSkeleton = () => {
  return (
    <div className="pt-2">
      {/* <Card className=" mx-2  product-card  row justify-content-center">
        <CardMedia>
          <Skeleton variant="rectangular" width="100%" height={200} className=" product-card-img " />
        </CardMedia>
        <CardContent>
          <Typography variant="h5" component="div">
            <Skeleton width="100%" />
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Skeleton width="80%" />
            <Skeleton width="80%" />
          </Typography>
        </CardContent>
      </Card> */}
    </div>
  );
};

export default ProductCardSkeleton;
