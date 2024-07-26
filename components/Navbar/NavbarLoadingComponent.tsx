import React from 'react';
import Placeholder from 'react-bootstrap/Placeholder';
const NavbarLoadingComponent = () => {
  return (
    <>
      <nav>
        <div className="container-fluid navbar-skeleton">
          <div className="row">
            <div className="text-center">
              <Placeholder as="div" animation="glow" size="lg">
                {[...Array(5)].map((_, index) => (
                  <Placeholder key={index} style={{ width: '5%', marginRight: '1%', height: 20 }} />
                ))}
              </Placeholder>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarLoadingComponent;
