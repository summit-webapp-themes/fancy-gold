import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { FaAlignJustify, FaCartPlus, FaHeart, FaRegCalendar } from 'react-icons/fa6';
import useFetchCartItems from '../../hooks/CartPageHook/useFetchCartItems';
import useNavbar from '../../hooks/GeneralHooks/useNavbar';
import useWishlist from '../../hooks/WishlistHooks/useWishlistHook';
import logo from '../../public/assets/images/logo.png';
import stylesNavbar from '../../styles/components/navbar.module.scss';
import HeaderCategories from './HeaderCategories';
import MobSideNavbar from './MobSideNavbar';

const Navbar = () => {
  const { navbarData, isLoading, errorMessage, selectedCurrencyValue, handleLogoutUser } = useNavbar();
  const { wishlistCount } = useWishlist();
  const { cartCount } = useFetchCartItems();
  const user = localStorage.getItem('user');
  const party_name = localStorage.getItem('party_name');
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const handleSearch = (e: any) => {
    e.preventDefault();
    router.push('/product-detail/' + searchTerm);
  };
  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  const navMenuclick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSidebar = (isOpen: any) => {
    setIsSidebarOpen(isOpen);
  };

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

  return (
    <>
      <header className={stylesNavbar.header}>
        <nav>
          <div className={`${stylesNavbar.navbar} ps-lg-5 pe-lg-4`}>
            <div className="w-100 d-flex justify-content-between pt-3">
              <div className="mobile-nav d-flex justify-content-sm-between">
                <Link href="#" legacyBehavior>
                  <a className="mobile-menu-toggle  w-icon-hamburger" aria-label="menu-toggle" onClick={navMenuclick}>
                    <FaAlignJustify className="icon" />
                  </a>
                </Link>
              </div>
              <div className={stylesNavbar.logo}>
                <Link href="/" legacyBehavior>
                  <a>
                    <Image className="pb-2 mb-1" src={logo} alt="logo" width={50} />
                  </a>
                </Link>
              </div>
              <div className={`d-block ${stylesNavbar.search_bar}`}>
                <div className="search-input">
                  <input
                    type="text"
                    className={`form-control ${stylesNavbar.search_bar_height}`}
                    placeholder="Search here"
                    aria-label="Search"
                    aria-describedby="basic-addon1"
                    onChange={(e: any) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </div>
              <div className={stylesNavbar.inlineList}>
                <ul className="nav  list-inline d-flex justify-content-evenly">
                  <li className={stylesNavbar.list_inline_item}>
                    <Link href="/cart" legacyBehavior>
                      <a className={`link-dark ${stylesNavbar.label}`}>
                        <div className={stylesNavbar.icon_container}>
                          <FaCartPlus className="icon" />
                          <span className={`${stylesNavbar.badge} ${stylesNavbar.badge_warning} text-white`}>{cartCount}</span>
                          <span className={`d-none d-md-inline-block theme-blue ${stylesNavbar.order_list_dropdown}`}>Cart</span>
                        </div>
                      </a>
                    </Link>
                  </li>
                  <li className={stylesNavbar.list_inline_item}>
                    <Link href="/wishlist " legacyBehavior>
                      <a className={`link-dark ${stylesNavbar.label}`}>
                        <div className={stylesNavbar.icon_container}>
                          <FaHeart className="icon" />
                          <span className={`${stylesNavbar.badge} ${stylesNavbar.badge_warning} text-white`}>{wishlistCount}</span>
                          <span className={`d-none d-md-inline-block theme-blue ${stylesNavbar.order_list_dropdown}`}>Wishlist</span>
                        </div>
                      </a>
                    </Link>
                  </li>

                  <li className={stylesNavbar.list_inline_item}>
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
                  <li className={stylesNavbar.list_inline_item}>
                    <div className={stylesNavbar.icon_container}>
                      <FaUserCircle className="icon" />
                    </div>
                    <NavDropdown title={party_name} id="basic-nav-dropdown" className={`text-center ${stylesNavbar.order_list_dropdown}`}>
                      <Link href="/order-history" passHref className="text-decoration-none">
                        <NavDropdown.Item as="a" className={`text-decoration-none ${stylesNavbar.order_list_items} custom-dropdown-item`}>
                          {user}
                        </NavDropdown.Item>
                      </Link>
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
                      <Link href="/" passHref className="text-decoration-none">
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
        <MobSideNavbar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} navbarData={navbarData} />
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
