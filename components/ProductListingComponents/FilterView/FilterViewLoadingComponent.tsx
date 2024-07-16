import { Skeleton } from '@mui/material';
import React from 'react';

const FilterViewLoadingComponent = () => {
  return (
    <>
      <Skeleton variant="rounded" width={180} height={720} id="sidebar" />
    </>
  );
};

export default FilterViewLoadingComponent;
