import React from 'react';
import { Skeleton } from '@mui/material';

const NavbarLoadingComponent = () => {
  return (
    <div className="d-flex justify-content-center py-2 overflow-hidden">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} variant="rectangular" width={90} height={18} className="mx-3" animation={'wave'} />
      ))}
    </div>
  );
};

export default NavbarLoadingComponent;
