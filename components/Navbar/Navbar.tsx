import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaAlignJustify, FaArrowRightToBracket, FaCartPlus, FaHeart, FaRegCalendar } from 'react-icons/fa6';
import useCartPage from '../../hooks/CartPageHook/useCartPageHook';
import useNavbar from '../../hooks/GeneralHooks/NavbarHooks/NavbarHook';
import useWishlist from '../../hooks/WishlistHooks/useWishlistHook';
import logo from '../../public/assets/images/logo.png';
import stylesNavbar from '../../styles/components/navbar.module.scss';
import HeaderCategories from './HeaderCategories';
import MobSideNavbar from './MobSideNavbar';
import { NavDropdown } from 'react-bootstrap';

const Navbar = () => {
  const { navbarData, isLoading, errorMessage, selectedCurrencyValue, handleLogout } = useNavbar();
  const { wishlistCount } = useWishlist();
  const { cartCount } = useCartPage();
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
              <div>
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
              <div>
                <ul className="nav  list-inline d-flex justify-content-evenly">
                  <li className={stylesNavbar.list_inline_item}>
                    <Link href="/cart" legacyBehavior>
                      <a className={`link-dark ${stylesNavbar.label}`}>
                        <div className={stylesNavbar.icon_container}>
                          <FaCartPlus className="icon" />
                          <span className={`${stylesNavbar.badge} ${stylesNavbar.badge_warning} text-white`}>{cartCount}</span>
                          <span className="d-none d-md-inline-block theme-blue">Cart</span>
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
                          <span className="d-none d-md-inline-block theme-blue ">Wishlist</span>
                        </div>
                      </a>
                    </Link>
                  </li>

                  <li className={stylesNavbar.list_inline_item}>
                    <div className="text-center">
                      <FaRegCalendar className="icon " />
                    </div>
                    <NavDropdown title="My Orders" id="basic-nav-dropdown" className={stylesNavbar.order_list_dropdown}>
                      <Link href="/orders/order-list" passHref className="text-decoration-none">
                        <NavDropdown.Item as="a" className={stylesNavbar.order_list_items}>
                          Order List
                        </NavDropdown.Item>
                      </Link>
                      <Link href="/orders/completed-orders" passHref className="text-decoration-none">
                        <NavDropdown.Item as="a" className={stylesNavbar.order_list_items}>
                          Completed Orders
                        </NavDropdown.Item>
                      </Link>
                      <Link href="/orders/cancelled-orders" passHref className="text-decoration-none">
                        <NavDropdown.Item as="a" className={stylesNavbar.order_list_items}>
                          Cancelled Orders
                        </NavDropdown.Item>
                      </Link>
                      {/* <NavDropdown.Divider /> */}
                    </NavDropdown>
                    {/* <Link href="/order-list" legacyBehavior>
                      <a className={`link-dark ${stylesNavbar.label}`}>
                        <div className={stylesNavbar.icon_container}>
                          <FaRegCalendar className="icon" />
                          <span className="d-none d-md-inline-block ms-1 theme-blue">Order List</span>
                        </div>
                      </a>
                    </Link> */}
                  </li>
                  <li className={stylesNavbar.list_inline_item}>
                    <Link href="/" legacyBehavior>
                      <a className={`link-dark ${stylesNavbar.label}`}>
                        <div className={stylesNavbar.icon_container}>
                          <FaArrowRightToBracket className="icon" />
                          <span className="d-none d-md-inline-block ms-1 theme-blue" onClick={() => handleLogout()}>
                            Sign-out
                          </span>
                        </div>
                      </a>
                    </Link>
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
