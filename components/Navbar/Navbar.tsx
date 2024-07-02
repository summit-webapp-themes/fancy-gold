import { useState } from 'react';
// import { Link, useNavigate, useParams } from "react-router-dom";
import logo from '../../public/assets/images/logo.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import useNavbar from '../../hooks/GeneralHooks/NavbarHooks/NavbarHook';
const Navbar = () => {
  const {
    navbarData,
    isLoading,
    // handleCurrencyValueChange,
    // selectedCurrencyValue,
  } = useNavbar();
  console.log(navbarData,'navBarData')
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (e: any) => {
    e.preventDefault();
    router.push(
      '/product-detail/' +
        //  +
        //   param.categoryId +
        //   "/" +
        //   param.subCategoryId +
        //   "/"
        searchTerm
    );
  };
  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };
  return (
    <>
      <header className="header">
        <nav>
          <div className="navbar">
            <div className="w-100 d-flex justify-content-between pt-3">
              <div>
                <Link href="/">
                  <Image
                    className="pb-2 mb-1"
                    src={logo}
                    alt="logo"
                    width={50}
                  />
                </Link>
              </div>
              <div className="d-block search-bar mx-2 ">
                <div className="search-input">
                  <input
                    type="text"
                    className=" form-control search-bar-height"
                    placeholder="Search here"
                    aria-label="Search"
                    aria-describedby="basic-addon1"
                    onChange={(e: any) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </div>
              <div>
                <ul className="nav align-items-center list-inline flex-wrap">
                  <li className="list-inline-item">
                    <Link href="/" className="link-dark label">
                      <div className="icon-container ">
                        <ShoppingCartOutlinedIcon className="icon" />
                        <span className="badge badge-warning">{/* 2 */}</span>
                        <span className="label d-none d-md-inline-block">
                          Cart
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link href="/whishlist" className="link-dark label">
                      <div className="icon-container ">
                        <FavoriteBorderIcon className="icon" />
                        <span className="badge badge-warning" id="lblCartCount">
                          {/* {wishlistCount} */}
                        </span>
                        <span className="d-none d-md-inline-block">
                          Wishlist
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link href="/order-list" className="link-dark label">
                      <div className="icon-container ">
                        <FormatListBulletedOutlinedIcon className="icon" />
                        <span className="d-none d-md-inline-block ms-1">
                          Order List
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link href="/" className="link-dark label">
                      <div className="icon-container ">
                        <LogoutOutlinedIcon className="icon" />
                        <span className="d-none d-md-inline-block ms-1">
                          Sign-out
                        </span>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};
export default Navbar;
