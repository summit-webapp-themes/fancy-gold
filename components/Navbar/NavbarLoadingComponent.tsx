import React from 'react';
import { Skeleton } from '@mui/material';

const NavbarLoadingComponent = () => {
  return (
    <div className="d-flex justify-content-center py-2 overflow-hidden">
      {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
        <Skeleton sx={{ bgcolor: '#cfcfcf' }} variant="rectangular" width={90} height={18} className="mx-3" animation={'wave'} />
      ))}
    </div>
  );
};

export default NavbarLoadingComponent;
