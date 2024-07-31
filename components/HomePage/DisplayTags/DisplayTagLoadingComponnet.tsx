import React from 'react';
import Image from 'next/image';
import Placeholder from 'react-bootstrap/Placeholder';
import lineImg from '../../../public/assets/images/Line-Design-blue.svg';
import ProductCardSkeleton from '../../../cards/ProductCardSkeleton';

const DisplayTagLoadingComponnet = () => {
  return (
    <div className="container-fluid pb-5 display-tags-section">
      <div className="row m-0">
        <div className="col-12 ">
          <div className="text-left text-secondary">
            <div className="text-center text-secondary">
              <h2 className="pt-5 pb-2 heading-text">
                <Placeholder as="h2" animation="glow">
                  <Placeholder style={{ width: '15%' }} />
                </Placeholder>
              </h2>
            </div>
            <Image src={lineImg} alt="img" style={{ width: '100%', height: '100%' }} height={200} className="py-4" />
            <div className="container  mt-4 pt-3">
              <div className="row ">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="col-md-2 col-lg-3 col-sm-6">
                    <ProductCardSkeleton />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayTagLoadingComponnet;
