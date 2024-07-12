import { Skeleton } from '@mui/material';
import React from 'react';

const FilterViewLoadingComponent = () => {
  return (
    <>
      <Skeleton variant="rounded" width={230} height={720} />
    </>
  );
};

export default FilterViewLoadingComponent;
