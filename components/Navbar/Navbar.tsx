import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { FaCartPlus, FaHeart, FaRegCalendar, FaArrowRightToBracket, FaAlignJustify } from 'react-icons/fa6';
import useNavbar from '../../hooks/GeneralHooks/NavbarHooks/NavbarHook';
import logo from '../../public/assets/images/logo.png';
import HeaderCategories from './HeaderCategories';
import MobSideNavbar from './MobSideNavbar';

const Navbar = () => {
  const { navbarData, isLoading, errorMessage, selectedCurrencyValue } = useNavbar();
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
      <header className="header">
        <nav>
          <div className="navbar">
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
              <div className="d-block search-bar">
                <div className="search-input">
                  <input
                    type="text"
                    className="form-control search-bar-height"
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
                  <li className="list-inline-item">
                    <Link href="/" legacyBehavior>
                      <a className="link-dark label">
                        <div className="icon-container">
                          <FaCartPlus className="icon" />
                          <span className="badge badge-warning">2</span>
                          <span className="d-none d-md-inline-block theme-blue">Cart</span>
                        </div>
                      </a>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link href="/" legacyBehavior>
                      <a className="link-dark label">
                        <div className="icon-container">
                          <FaHeart className="icon" />
                          <span className="badge badge-warning" id="lblCartCount">
                            {/* {wishlistCount} */}
                          </span>
                          <span className="d-none d-md-inline-block theme-blue ">Wishlist</span>
                        </div>
                      </a>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link href="/" legacyBehavior>
                      <a className="link-dark label">
                        <div className="icon-container">
                          <FaRegCalendar className="icon" />
                          <span className="d-none d-md-inline-block ms-1 theme-blue">Order List</span>
                        </div>
                      </a>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link href="/" legacyBehavior>
                      <a className="link-dark label">
                        <div className="icon-container">
                          <FaArrowRightToBracket className="icon" />
                          <span className="d-none d-md-inline-block ms-1 theme-blue">Sign-out</span>
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
