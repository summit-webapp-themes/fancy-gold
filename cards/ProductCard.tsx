import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import { IoCart } from 'react-icons/io5';
import { get_access_token } from '../store/slices/auth/token-login-slice';
import { fetchWishlistUser, wishlist_state } from '../store/slices/wishlist-slices/wishlist-slice';
import { CONSTANTS } from '../services/config/app-config';
import noImage from '../public/assets/images/no_image.png';
import ProductCardStyles from '../styles/components/productCard.module.scss';
const ProductCard = ({ data, handleShow , wishlistData}: any) => {
  const TokenFromStore: any = useSelector(get_access_token);
  const dispatch = useDispatch()
  let wishProducts: any;
  const imageLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
  };
  const handleAddToWishlist =()=>{
    const requestNew = {
      prod_id: data?.name,
      getWishlist: false,
      deleteWishlist: false,
      addTowishlist: true,
      token: TokenFromStore?.token,
    };
    const requestList = {
      getWishlist: true,
      deleteWishlist: false,
      addTowishlist: false,
      token: TokenFromStore?.token,
    };
    dispatch(fetchWishlistUser(requestNew));

    setTimeout(() => {
      dispatch(fetchWishlistUser(requestList));
    }, 100);
  }
  const handleRemoveFromWishlist =()=>{
    const requestDelete = {
      prod_id: data?.name,
      getWishlist: false,
      deleteWishlist: true,
      addTowishlist: false,
      token: TokenFromStore?.token,
    };
    const requestList = {
      getWishlist: true,
      deleteWishlist: false,
      addTowishlist: false,
      token: TokenFromStore?.token,
    };
    dispatch(fetchWishlistUser(requestDelete));
    setTimeout(() => {
      dispatch(fetchWishlistUser(requestList));
    }, 900);
  }

  return (
    <Card className={` ${ProductCardStyles.product_card} pt-2`}>
      <div className={` ${ProductCardStyles.product_card_img} `}>
        {wishlistData?.length > 0 && 
          wishlistData?.map((item: any, index: number) => {
            if (item.name === data?.name) {
              wishProducts = item?.name;
            }
          })}
        {!wishProducts ? (
          <span className={`${ProductCardStyles.wishlist_icon} text-danger `}>
            <FaRegHeart onClick={handleAddToWishlist}/>
          </span>
        ) : (
          <span className={`${ProductCardStyles.wishlist_icon} text-danger `}>
            <FaHeart onClick={handleRemoveFromWishlist}/> 
          </span>
        )}
        <Link href={`${data?.url}`} target="_blank" className="text-decoration-none text-dark">
          <Image
            loader={data.image !== null ? imageLoader : undefined}
            src={data.image !== null ? data.image : noImage}
            width={1200}
            height={900}
            alt="Item Image"
            className={`${ProductCardStyles.product_code_img}`}
            style={{ width: '100%', height: '100%' }}
          />
        </Link>
      </div>
      <Card.Body className={`${ProductCardStyles.content_wrap}`}>
        <div className={`${ProductCardStyles.product_content_wrap}`}>
          <Link href={`${data?.url}`} target="_blank" className={`text-dark text-decoration-none ${ProductCardStyles.product_name}`}>
            <Card.Title className={`my-0 ${ProductCardStyles.product_name} mb-0`}> {data?.name}</Card.Title>
          </Link>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              {data?.bom_factory_code ? (
                <Card.Text className={`my-0 ${ProductCardStyles.product_card_text}`}>{data?.bom_factory_code}</Card.Text>
              ) : null}

              <Card.Text className={`my-0 py-0 ${ProductCardStyles.product_card_text} `}>Gross wt: {data.weight_per_unit}</Card.Text>
              <Card.Text className={`my-0 py-0 ${ProductCardStyles.product_card_text} `}>Size: {data.length}</Card.Text>
            </div>
            <div>
              <button
                className={`btn btn-outline-primary text-uppercase mb-0  ${ProductCardStyles.add_to_cart_btn} `}
                onClick={() => handleShow(data?.name, data?.variant_of)}
              >
                Add
                <IoCart className={ProductCardStyles.icon_margin} />
              </button>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
