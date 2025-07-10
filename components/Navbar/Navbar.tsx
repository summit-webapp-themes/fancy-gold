import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import { FaAlignJustify, FaCartPlus, FaHeart, FaRegCalendar } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useFetchCartItems from '../../hooks/CartPageHook/useFetchCartItems';
import useNavbar from '../../hooks/GeneralHooks/useNavbar';
import useWishlist from '../../hooks/WishlistHooks/useWishlistHook';
import logo from '../../public/assets/images/logo.png';
import fetchSearchDataAPI from '../../services/api/general-apis/search-api';
import { CONSTANTS } from '../../services/config/app-config';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import stylesNavbar from '../../styles/components/navbar.module.scss';
import HeaderCategories from './HeaderCategories';
import MobSideNavbar from './MobSideNavbar';

const Navbar = () => {
  const { SUMMIT_APP_CONFIG } = CONSTANTS;
  const TokenFromStore: any = useSelector(get_access_token);

  const { navbarData, isLoading, errorMessage, selectedCurrencyValue, handleLogoutUser } = useNavbar();

  const dispatch = useDispatch();
  const { wishlistCount } = useWishlist();
  const { cartCount, cartListingItems } = useFetchCartItems();
  const user = localStorage.getItem('user');
  const party_name = localStorage.getItem('party_name');
  const isCatalogUser = localStorage.getItem('isCatalogUser');
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const handleSearch = (e: any) => {
    e.preventDefault();
    if (searchTerm !== '') {
      const getSearchData = async () => {
        const searchAPIRes = await fetchSearchDataAPI(SUMMIT_APP_CONFIG, TokenFromStore?.token, searchTerm);
        if (searchAPIRes?.status === 200) {
          if (searchAPIRes?.data?.message?.status === 'success' && searchAPIRes?.data?.message?.data?.length > 0) {
            const saveProduct = searchAPIRes?.data?.message?.data[0]?.product;
            router.push(`/${saveProduct}`);
            setSearchTerm('');
          } else if (searchAPIRes?.data?.message?.msg === 'error') {
            toast.error(searchAPIRes?.data?.message?.error);
          }
        }
      };
      getSearchData();
    }
  };
  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };
  const handleCloseSidebar = () => setIsSidebarOpen(false);
  const navMenuclick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSidebar = (isOpen: any) => {
    setIsSidebarOpen(isOpen);
  };

  // const handleLogout = () => {
  //   localStorage.clear();
  //   dispatch(resetStore());
  // };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as per your design
    };

    // Initial check on component mount
    handleResize();

    // Event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    if (cartListingItems && cartListingItems?.cust_name) {
      localStorage.setItem('cust_name', cartListingItems?.cust_name);
    }
  }, [cartListingItems]);

  return (
    <>
      <header className={stylesNavbar.header}>
        <nav>
          <div className={`${stylesNavbar.navbar} ps-lg-5 pe-lg-4`}>
            <div className="w-100 d-flex justify-content-between gap-3 gap-md-4 pt-3">
              <div className=' d-flex align-items-start gap-2'>
                <div className="mobile-nav d-flex justify-content-sm-between px-2">
                  <div>
                    <a className="mobile-menu-toggle  w-icon-hamburger" aria-label="menu-toggle" onClick={navMenuclick}>
                      <FaAlignJustify className="icon" />
                    </a>
                  </div>
                </div>
                <div className={stylesNavbar.logo}>
                  <Link href="/" legacyBehavior>
                    <a>
                      <Image className="pb-2 mb-1" src={logo} alt="logo" width={50} />
                    </a>
                  </Link>
                </div>
              </div>
              {!isMobile && (
                <div className={`d-block ${stylesNavbar.search_bar}`}>
                  <div className="search-input position-relative ">
                    <input
                      type="text"
                      className={`form-control ${stylesNavbar.search_bar_input}`}
                      value={searchTerm}
                      placeholder="Search here"
                      aria-label="Search"
                      aria-describedby="basic-addon1"
                      onChange={(e: any) => setSearchTerm(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                    <FaSearch className={stylesNavbar.search_icon} onClick={(e) => handleSearch(e)} />
                  </div>
                </div>
              )}
              <div className={` ${stylesNavbar.inlineList} `}>
                <ul className={`nav list-inline d-flex justify-content-end gap-2 gap-md-1 pe-3 flex-nowrap ${stylesNavbar.mobnavbar}`}>
                  <li className={`${stylesNavbar.list_inline_item} ${stylesNavbar.list_inline_item_cart}`}>
                    <Link href="/cart" legacyBehavior>
                      <a className={`link-dark ${stylesNavbar.label}`}>
                        <div className={stylesNavbar.icon_container}>
                          <FaCartPlus className="icon" />
                          <span className={`${stylesNavbar.badge} ${stylesNavbar.badge_warning} text-white`}>{cartCount}</span>
                          <span className={` theme-blue ${stylesNavbar.order_list_dropdown}`}>Cart</span>
                        </div>
                      </a>
                    </Link>
                  </li>
                  <li className={`me-md-2 ${stylesNavbar.list_inline_item} ${stylesNavbar.list_inline_item_wishlist}`}>
                    <Link href="/wishlist " legacyBehavior>
                      <a className={`link-dark ${stylesNavbar.label}`}>
                        <div className={stylesNavbar.icon_container}>
                          <FaHeart className="icon" />
                          <span className={`${stylesNavbar.badge} ${stylesNavbar.badge_warning} text-white`}>{wishlistCount}</span>
                          <span className={`theme-blue ${stylesNavbar.order_list_dropdown}`}>Wishlist</span>
                        </div>
                      </a>
                    </Link>
                  </li>

                  <li className={`me-3 ${stylesNavbar.list_inline_item} d-none d-md-block`} style={{ width: '70px'}}>
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
                        <Link href="/order-history/accepted-order" passHref className="text-decoration-none">
                        <NavDropdown.Item as="a" className={`text-decoration-none ${stylesNavbar.order_list_items} custom-dropdown-item`}>
                          Accepted Orders
                        </NavDropdown.Item>
                      </Link>
                        <Link href="/order-history/planned-order" passHref className="text-decoration-none">
                        <NavDropdown.Item as="a" className={`text-decoration-none ${stylesNavbar.order_list_items} custom-dropdown-item`}>
                          Planned Orders
                        </NavDropdown.Item>
                      </Link>
                    </NavDropdown>
                  </li>
                  <li className={`${stylesNavbar.list_inline_item} ${stylesNavbar.list_inline_margin} d-none d-md-block`}>
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

                  <li className={stylesNavbar.list_inline_item}>
                    <div className={stylesNavbar.icon_container}>
                      <FaUserCircle className="icon" />
                    </div>
                    <NavDropdown
                      title={party_name}
                      id="basic-nav-dropdown"
                      className={`text-center ${stylesNavbar.order_list_dropdown} dropdown-menu-end `}
                    >
                      <NavDropdown.Item as="a" className={`text-decoration-none ${stylesNavbar.order_list_items} custom-dropdown-item`}>
                        {user}
                      </NavDropdown.Item>

                      <Link href="/quick-order" passHref className="text-decoration-none">
                        <NavDropdown.Item as="a" className={`text-decoration-none ${stylesNavbar.order_list_items} custom-dropdown-item`}>
                          Quick Order
                        </NavDropdown.Item>
                      </Link>
                      <Link href="/bulk-order" passHref className="text-decoration-none">
                        <NavDropdown.Item as="a" className={`text-decoration-none ${stylesNavbar.order_list_items} custom-dropdown-item`}>
                          Bulk Order
                        </NavDropdown.Item>
                      </Link>
                      <Link href="/arc-casting" passHref className="text-decoration-none">
                        <NavDropdown.Item as="a" className={`text-decoration-none ${stylesNavbar.order_list_items} custom-dropdown-item`}>
                          ARC Casting
                        </NavDropdown.Item>
                      </Link>
                      {isCatalogUser === 'true' && (
                        <Link href="/catalog" passHref className="text-decoration-none">
                          <NavDropdown.Item as="a" className={`text-decoration-none ${stylesNavbar.order_list_items} custom-dropdown-item`}>
                            View Catalog
                          </NavDropdown.Item>
                        </Link>
                      )}
                      <Link href="#" passHref className="text-decoration-none" onClick={handleLogoutUser}>
                        <NavDropdown.Item as="a" className={`text-decoration-none ${stylesNavbar.order_list_items} custom-dropdown-item`}>
                          Sign Out
                        </NavDropdown.Item>
                      </Link>
                    </NavDropdown>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
      {isMobile ? (
        <MobSideNavbar
          isLoading={isLoading}
          show={isSidebarOpen}
          handleClose={handleCloseSidebar}
          navbarData={navbarData}
          setIsSidebarOpen={setIsSidebarOpen}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
        />
      ) : (
        <HeaderCategories
          navbarData={navbarData}
          isLoading={isLoading}
          errorMessage={errorMessage}
          selectedCurrencyValue={selectedCurrencyValue}
        />
      )}
    </>
  );
};

export default Navbar;
