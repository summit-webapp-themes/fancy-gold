import React from 'react';
import Placeholder from 'react-bootstrap/Placeholder';
import { FaAlignJustify } from 'react-icons/fa6';
import filterStyles from '../../../styles/components/filterSidebar.module.scss';

const FilterViewLoadingComponent = () => {
  return (
    <div className="h-100 p-3" id={`${filterStyles.sidebar}`}>
      <h4>Filters</h4>
      <div className="input-group input-group-sm mt-2 mb-3">
        <input type="text" className="form-control" placeholder="Search here" name="search" id="search" autoComplete="off" />
        <span className="input-group-text" id="inputGroup-sizing-sm">
          <FaAlignJustify />
        </span>
      </div>
      {[...Array(5)].map((_, index) => (
        <>
          <div key={index}>
            <Placeholder as="h6" animation="glow" style={{ marginTop: '15px' }}>
              <Placeholder style={{ width: '100%' }} />
            </Placeholder>
            <hr className="my-1" />

            <Placeholder as="div" animation="glow">
              <Placeholder style={{ width: '70%', minHeight: '10px' }} />
            </Placeholder>

            <Placeholder as="div" animation="glow">
              <Placeholder style={{ width: '47%', minHeight: '10px' }} />
            </Placeholder>
          </div>
        </>
      ))}
    </div>
  );
};

export default FilterViewLoadingComponent;
