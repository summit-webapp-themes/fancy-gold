import { Card, CardContent, CardMedia, Skeleton, Typography } from '@mui/material';
import React from 'react';

const GridViewLoadingComponent = () => {
  return (
    <>
      <Card style={{ maxWidth: 345, margin: 'auto' }}>
        <CardMedia>
          <Skeleton variant="rectangular" width="100%" height={140} />
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
      </Card>
    </>
  );
};

export default GridViewLoadingComponent;
