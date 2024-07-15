import Link from 'next/link';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

const MobSideNavbar = ({
  navbarData,
  navMenuclick,
  setClicks,
  clicks,
  searchValue,
  setSearchValue,
  handleSearch,
  isLoading,
  selectedMultiLangData,
  selectedCurrencyValue,
  isOpen,
  toggleSidebar,
}: any) => {
  const [arrowIndex, setarrowIndex] = useState<any>(null);
  const [indexVal, setindexVal] = useState<any>(null);
  const [rotatedIndex, setRotatedIndex] = useState<number | null>(null);

  const onClickCloseNav = () => {
    console.log('click close');
    setClicks(!clicks);
    toggleSidebar(false);
  };

  const mobileHandle = (i: any) => {
    if (indexVal === i) {
      return setindexVal(null);
    }
    setindexVal(i);
    return false;
  };

  const arrowHandle = (index: any) => {
    if (arrowIndex === index) {
      return setarrowIndex(null);
    }
    setarrowIndex(index);
    return false;
  };

  const handleCaretClick = (index: number) => {
    if (rotatedIndex === index) {
      setRotatedIndex(null);
    } else {
      setRotatedIndex(index);
    }
  };

  return (
    <>
      <div className={`mobile-menu-wrapper sidebar ${isOpen ? 'open' : ''}`}>
        <div className="mobile-menu-overlay"></div>
        <div className="mobile-menu-container scrollable bg-light">
          <div className="d-flex justify-content-end mb-1 ">
            <Link href="#" legacyBehavior>
              <a className="#" onClick={() => toggleSidebar(false)}>
                <i className="btn-close btn_close_btn"></i>
              </a>
            </Link>
          </div>
          <div className="header-search hs-expanded hs-round input-wrapper">
            <input
              type="text"
              className="form-control border"
              name="search"
              id="search"
              placeholder={selectedMultiLangData?.search_in}
              value={searchValue}
              onChange={(e: any) => setSearchValue(e.target.value)}
              required
            />
            <button className="btn btn-search text-primary border" type="submit" onClick={handleSearch}>
              <SearchIcon className="icon" />
            </button>
          </div>
          <div className="tab-content">
            <div className="tab-pane active bg-light" id="categories">
              {navbarData?.length > 0 &&
                navbarData.map((navbardata: any, i: any) => (
                  <ul className="mobile-menu" key={i}>
                    <li className="bg-light">
                      <a href="#" className="text-dark d-flex justify-content-between">
                        <span>{navbardata.name}</span>

                        <span>
                          <i
                            className={`fa fa-caret-right fs-5 caret-icon ${rotatedIndex === i ? 'rotate' : ''}`}
                            aria-hidden="true"
                            onClick={() => {
                              mobileHandle(i);
                              handleCaretClick(i);
                            }}
                          ></i>
                        </span>
                      </a>
                      <ul style={{ display: indexVal === i ? 'block' : 'none' }}>
                        {navbardata?.values?.map((navbarVal: any, index: any) => (
                          <li key={index}>
                            <Link href={`${navbarVal.url}?page=1&currency=${selectedCurrencyValue}`} legacyBehavior>
                              <a className="text-dark d-flex justify-content-around">
                                <span className="w-75">{navbarVal.name}</span>
                                <span className="">
                                  <i
                                    className="fa fa-arrow-right fs-2 me-3"
                                    onClick={() => {
                                      arrowHandle(index);
                                    }}
                                  ></i>
                                </span>
                              </a>
                            </Link>
                            <ul
                              style={{
                                display: arrowIndex === index ? 'block' : 'none',
                              }}
                            >
                              {navbarVal?.values?.map((navbarlist: any, i: any) => (
                                <li key={i}>
                                  <Link href={`${navbarlist.url}?page=1&currency=${selectedCurrencyValue}`} legacyBehavior>
                                    <a className="text-dark" onClick={onClickCloseNav}>
                                      <span className="pt-2"> {navbarlist?.name}</span>
                                    </a>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobSideNavbar;
