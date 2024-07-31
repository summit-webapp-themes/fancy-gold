import React from 'react';
import Placeholder from 'react-bootstrap/Placeholder';

const BannerSkeleton = () => {
  return (
    <div>
      <Placeholder as="div" animation="glow">
        <Placeholder xs={12} style={{ height: '550px', width: '100%', display: 'block' }} />
      </Placeholder>
    </div>
  );
};

export default BannerSkeleton;
