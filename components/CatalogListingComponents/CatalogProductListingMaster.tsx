import Image from 'next/image';
import React from 'react';
import image from '../../public/assets/images/under-maintainance.webp';

function CatalogProductListingMaster() {
  return (
    <div className="container vh-100">
      <div className="d-flex justify-content-center pt-5 mt-5 vh-100">
        <div>
          <Image src={image} alt="" className="img-fluid" width={450} height={695} />
          <h4 className="text-center pt-3">This page is under maintenance.</h4>
        </div>
      </div>
    </div>
  );
}

export default CatalogProductListingMaster;
