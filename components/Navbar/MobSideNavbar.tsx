import Link from 'next/link';
import React, { useState } from 'react';
import { FaRegCalendar } from 'react-icons/fa6';
import { NavDropdown } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import stylesMobnavbar from '../../styles/components/mobNavbar.module.scss';
import stylesNavbar from '../../styles/components/navbar.module.scss';
import { set } from 'react-ga';
import { setIn } from 'formik';

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
  const [arrowIndex, setArrowIndex] = useState<string | null>(null);
  const [indexVal, setIndexVal] = useState<number | null>(null);
  const [rotatedIndex, setRotatedIndex] = useState<number | null>(null);

  const onClickCloseNav = () => {
    // setClicks(!clicks);
    setIndexVal(null);
    setArrowIndex(null);
    toggleSidebar(false);
  };

  const mobileHandle = (i: any) => {
    if (indexVal === i) {
      setIndexVal(null);
      setArrowIndex(null);
    } else {
      setIndexVal(i);
    }
  };

  const handleSubItemClick = (index: number, subIndex: number) => {
    if (arrowIndex === `${index}-${subIndex}`) {
      setArrowIndex(null);
    } else {
      setArrowIndex(`${index}-${subIndex}`);
    }
  }

  const handleCaretClick = (index: number) => {
    if (rotatedIndex === index) {
      setRotatedIndex(null);
    } else {
      setRotatedIndex(index);
    }
  };

  const handleDataRendering = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (navbarData?.length > 0) {
      const categoriesData = navbarData[0]?.values;
      return (
        <div className="tab-content">
          <div className="tab-pane active bg-light" id="categories">
            {categoriesData?.map((item: any, index: number) => (
              <ul className={stylesMobnavbar.mobile_menu} key={index}>
                <li className="bg-light">
                  <a href="#" className="text-dark d-flex justify-content-between" onClick={() => mobileHandle(index)}>
                    <span>{item.label}</span>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className={`bi ${stylesMobnavbar.bi_chevron_right} ${indexVal === index ? `${stylesMobnavbar.rotate}` : ''}`}
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.854 7.646a.5.5 0 0 0 0-.708L8.707 3.5a.5.5 0 0 0-.854.354v7a.5.5 0 0 0 .854.354l3.147-3.5z" />
                      </svg>
                    </span>
                  </a>
                  <ul style={{ display: indexVal === index ? 'block' : 'none' }}>
                    {item?.values?.map((subItem: any, subIndex: number) => (
                      <li key={subIndex}>
                        <Link
                          href={{
                            pathname: `${subItem?.url}`,
                            query: { page: '1', sort_by: 'latest', currency: 'INR' },
                          }}
                          legacyBehavior
                        >
                          <a href='#' className="text-dark d-flex justify-content-between ps-3 ms-1" onClick={() => handleSubItemClick(index, subIndex)}>
                            <span className="w-75">{subItem?.label}</span>
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className={`bi ${stylesMobnavbar.bi_chevron_right} ${arrowIndex === `${index}-${subIndex}` ? `${stylesMobnavbar.rotate}` : ''}`}
                                viewBox="0 0 16 16"
                              >
                                <path d="M11.854 7.646a.5.5 0 0 0 0-.708L8.707 3.5a.5.5 0 0 0-.854.354v7a.5.5 0 0 0 .854.354l3.147-3.5z" />
                              </svg>
                            </span>
                          </a>
                        </Link>
                        <ul style={{ display: arrowIndex === `${index}-${subIndex}` ? 'block' : 'none' }}>
                          {subItem?.values?.map((subSubItem: any, subSubIndex: number) => (
                            <li key={subSubIndex}>
                              <Link
                                href={{
                                  pathname: `${subSubItem?.url}`,
                                  query: { page: '1', sort_by: 'latest', currency: 'INR' },
                                }}
                                legacyBehavior
                              >
                                <a className="text-dark d-flex justify-content-start ps-4 ms-1" onClick={onClickCloseNav}>
                                  <span className="pt-2">{subSubItem?.label}</span>
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
            {/* <ul className={`${stylesMobnavbar.mobile_menu} `}>
              <li className={`${stylesNavbar.list_inline_item} `}>
                <div className={stylesNavbar.icon_container}>
                  <FaRegCalendar className="icon " />
                </div>
                <NavDropdown title="My Orders" id="basic-nav-dropdown" className={stylesNavbar.order_list_dropdown}>
                  <Link href="/order-history" passHref className="text-decoration-none">
                    <NavDropdown.Item as="a" className={`text-decoration-none ${stylesNavbar.order_list_items} custom-dropdown-item`}>
                      Order List
                    </NavDropdown.Item>
                  </Link>
                  <Link href="/order-history/completed-orders" passHref className="text-decoration-none">
                    <NavDropdown.Item as="a" className={`text-decoration-none ${stylesNavbar.order_list_items} custom-dropdown-item`}>
                      Completed Orders
                    </NavDropdown.Item>
                  </Link>
                  <Link href="/order-history/cancelled-orders" passHref className="text-decoration-none">
                    <NavDropdown.Item as="a" className={`text-decoration-none ${stylesNavbar.order_list_items} custom-dropdown-item`}>
                      Cancelled Orders
                    </NavDropdown.Item>
                  </Link>
                </NavDropdown>
              </li>
              <li className={`${stylesNavbar.list_inline_item} ${stylesNavbar.list_inline_margin}`}>
                <div className="text-center">
                  <FaRegCalendar className="icon " />
                </div>
                <NavDropdown title="Reports" id="basic-nav-dropdown" className={stylesNavbar.order_list_dropdown}>
                  <Link href="/reports/pending-order" passHref className="text-decoration-none">
                    <NavDropdown.Item as="a" className={`text-decoration-none ${stylesNavbar.order_list_items} custom-dropdown-item`}>
                      Pending Order Report
                    </NavDropdown.Item>
                  </Link>
                  <Link href="/reports/in-process-orders-report" passHref className="text-decoration-none">
                    <NavDropdown.Item as="a" className={`text-decoration-none ${stylesNavbar.order_list_items} custom-dropdown-item`}>
                      In Process Order Report
                    </NavDropdown.Item>
                  </Link>
                  <Link href="/reports/review-report" passHref className="text-decoration-none">
                    <NavDropdown.Item as="a" className={`text-decoration-none ${stylesNavbar.order_list_items} custom-dropdown-item`}>
                      Review Report
                    </NavDropdown.Item>
                  </Link>
                  <Link href="/reports/dispatched-orders-report" passHref className="text-decoration-none">
                    <NavDropdown.Item as="a" className={`text-decoration-none ${stylesNavbar.order_list_items} custom-dropdown-item`}>
                      Dispatched Order Report
                    </NavDropdown.Item>
                  </Link>
                  <Link href="/reports/due-date-reminder-report" passHref className="text-decoration-none">
                    <NavDropdown.Item as="a" className={`text-decoration-none ${stylesNavbar.order_list_items} custom-dropdown-item`}>
                      Due Date Reminder Report
                    </NavDropdown.Item>
                  </Link>
                  <Link href="/reports/late-orders-report" passHref className="text-decoration-none">
                    <NavDropdown.Item as="a" className={`text-decoration-none ${stylesNavbar.order_list_items} custom-dropdown-item`}>
                      Late Order Report
                    </NavDropdown.Item>
                  </Link>
                </NavDropdown>
              </li>
            </ul> */}
          </div>
        </div>
      );
    }
    return <div>No data found</div>;
  };

  return (
    <div className={`${stylesMobnavbar.mobile_menu_wrapper} ${stylesMobnavbar.sidebar} ${isOpen ? `${stylesMobnavbar.open}` : ''}`}>
      <div className={stylesMobnavbar.mobile_menu_overlay}></div>
      <div className={`${stylesMobnavbar.mobile_menu_container} scrollable bg-light`}>
        <div className="d-flex justify-content-end mb-1">
          <Link href="#" legacyBehavior>
            <a onClick={() => toggleSidebar(false)}>
              <i className="btn-close btn_close_btn"></i>
            </a>
          </Link>
        </div>

        <div className={`d-block w-100 ${stylesNavbar.search_bar}`}>
          <div className="search-input position-relative">
            <input
              type="text"
              className={`form-control ${stylesNavbar.search_bar_input}`}
              placeholder="Search here"
              aria-label="Search"
              aria-describedby="basic-addon1"
              onChange={(e: any) => setSearchValue(e.target.value)}
            />
            <FaSearch className={stylesNavbar.search_icon} onClick={(e) => handleSearch(e)} />
          </div>
        </div>

        {handleDataRendering()}
      </div>
    </div>
  );
};

export default MobSideNavbar;
