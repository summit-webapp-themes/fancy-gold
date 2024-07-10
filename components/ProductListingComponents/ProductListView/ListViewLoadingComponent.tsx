import { Box, Card, CardContent, CardMedia, Skeleton, Typography } from '@mui/material';
import React from 'react';

const ListViewLoadingComponent = () => {
  return (
    <>
      <Card style={{ display: 'flex', margin: '16px 0', padding: '16px' }}>
        <CardMedia>
          <Skeleton variant="rectangular" width={140} height={140} />
        </CardMedia>
        <CardContent style={{ flex: '1 0 auto', paddingLeft: '16px' }}>
          <Typography variant="h5" component="div">
            <Skeleton width="60%" />
          </Typography>
          <Box mt={1}>
            <Skeleton width="80%" />
            <Skeleton width="40%" />
          </Box>
          <Box display="flex" alignItems="center" mt={2}>
            <Skeleton variant="rectangular" width={80} height={20} style={{ marginRight: 8 }} />
            <Skeleton variant="rectangular" width={40} height={20} />
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default ListViewLoadingComponent;
