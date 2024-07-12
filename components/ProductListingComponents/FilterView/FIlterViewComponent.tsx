import React from 'react';
import FilterViewLoadingComponent from './FilterViewLoadingComponent';
import Sidebar from './Sidebar';

const FilterViewComponent = () => {
  return (
    <div>
      {/* <FilterViewLoadingComponent /> */}

      <div className="sidebar_hide">
        <Sidebar />
      </div>
    </div>
  );
};

export default FilterViewComponent;
