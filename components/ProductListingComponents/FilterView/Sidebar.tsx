import React, { useState } from 'react';

const Sidebar = () => {
  const [searchVal, setsearchVals] = useState('');

  return (
    <aside className="sidebar">
      <div className="search-field search-wrapper m-2">
        <div className="input-group search-input-grp pt-2">
          <input
            type="text"
            value={searchVal}
            className="form-control search-box"
            placeholder="Search here"
            aria-label="Search"
            aria-describedby="basic-addon1"
            onChange={(e: any) => setsearchVals(e?.target?.value)}
          />

          <button className="input-group-text" id="basic-addon1">
            <i className="fa fa-search" aria-hidden="true" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
