import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Card from 'react-bootstrap/Card';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { IoCart } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import useAddToWishlist from '../hooks/WishlistHooks/useAddToWishlistHook';
import noImage from '../public/assets/images/no_image.png';
import { CONSTANTS } from '../services/config/app-config';
import ProductCardStyles from '../styles/components/productCard.module.scss';
import { FaEye } from 'react-icons/fa';
import { useState } from 'react';

const ProductCard = ({ data, handleShow, wishlistData, btnAction, cartData, handlePreviewModal }: any) => {
  const router = useRouter();
  const { handleAddToWishList, handleRemoveFromWishList } = useAddToWishlist();
  const [isHovered, setIsHovered] = useState(false);
   const { page, filter } = router.query;
  let wishProducts: any;
  let cartProducts: any;
  const imageLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
  };
  const handleRenderIcon = () => {
    const socketData = { page_type: 'Product', page_id: data?.slug };
    {
      wishlistData?.length > 0 &&
        wishlistData?.map((item: any, index: number) => {
          if (item.name === data?.name) {
            wishProducts = item?.name;
          }
        });
    }
    if (!wishProducts) {
      return (
        <span className={`${ProductCardStyles.wishlist_icon} text-danger`}>
          <>{FaRegHeart && <FaRegHeart onClick={() => handleAddToWishList(data, socketData)} />}</>
        </span>
      );
    } else {
      if (router?.asPath?.startsWith('/wishlist')) {
        return (
          <span className={`${ProductCardStyles.wishlist_icon} text-secondary `}>
            <RxCross2 onClick={() => handleRemoveFromWishList(data?.name)} />
          </span>
        );
      } else {
        return (
          <span className={`${ProductCardStyles.wishlist_icon} text-danger `}>
            <FaHeart onClick={() => handleRemoveFromWishList(data?.name)} />
          </span>
        );
      }
    }
  };
  const handleRenderAddToCartBtn = () => {
    {
      cartData?.length > 0 &&
        cartData?.map((item: any) => {
          if (item === data?.name) {
            cartProducts = item;
          }
        });
    }
    if (!cartProducts) {
      if (btnAction === 'Add') {
        return (
          <button
            className={`btn btn-outline-primary text-uppercase mb-0  ${ProductCardStyles.add_to_cart_btn} `}
            onClick={() => handleShow(data?.name, data?.variant_of, data?.slug)}
          >
            {btnAction}
            <IoCart className={ProductCardStyles.icon_margin} />
          </button>
        );
      } else {
        return (
          <button
            className={`btn btn-outline-primary text-uppercase mb-0  ${ProductCardStyles.add_to_cart_btn} `}
            onClick={() => {
              // window.location.href = `${data?.url}`;
              router.push(`${data?.url}`);
            }}
          >
            {btnAction}
          </button>
        );
      }
    } else {
      return (
        <button
          className={`btn btn-outline-primary text-uppercase mb-0  ${ProductCardStyles.addded_to_cart_btn}`}
          onClick={() => {
            console.log(data?.slug);
            handleShow(data?.name, data?.variant_of, data?.slug);
          }}
        >
          Added
        </button>
      );
    }
  };
  return (
    <Card className={` ${ProductCardStyles.product_card}`}>
      <div className={` ${ProductCardStyles.product_card_img} `}>
        {handleRenderIcon()}
        <Link
          href={`${data?.url}?filter=${filter}`}
          className="text-decoration-none text-dark"
          onClick={() => handlePreviewModal(data)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {data?.image && data?.image !== null}
          <Image
            loader={data.image !== null ? imageLoader : undefined}
            src={data.image !== null ? data.image : noImage}
            width={1200}
            height={900}
            alt="Item Image"
            className={`${ProductCardStyles.product_code_img}`}
            style={{ width: '100%', height: '100%' }}
            priority={true}
          />
          {isHovered && (
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center">
              <FaEye size={24} className="text-white" />
            </div>
          )}
        </Link>
      </div>
      <Card.Body className={`${ProductCardStyles.content_wrap}`}>
        <div className={`${ProductCardStyles.product_content_wrap}`}>
          <Link href={`${data?.url}?filter=${filter}`} className={`text-dark text-decoration-none ${ProductCardStyles.product_name}`}>
            <Card.Title className={`my-0 ${ProductCardStyles.product_name} mb-0`}> {data?.name}</Card.Title>
          </Link>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center">
            <div>
              {/* {data?.bom_factory_code ? (
                <Card.Text className={`my-0 ${ProductCardStyles.product_card_text}`}>{data?.bom_factory_code}</Card.Text>
              ) : null}
              <Card.Text className={`my-0 py-0 ${ProductCardStyles.product_card_text} `}>Gross wt: {data.weight_per_unit}</Card.Text> */}
              {/* <Card.Text className={`my-0 py-0 ${ProductCardStyles.product_card_text} `}>Size: {data.length}</Card.Text> */}
              {/* {(data?.level_2_category === 'MANGALSUTRA (75)' ||
                data?.level_2_category === 'MANGALSUTRA (92)' ||
                data?.item_group === 'STONE CHAINS') && (
                <Card.Text className={`my-0 py-0 ${ProductCardStyles.product_card_text} `}>Net wt: {data?.net_weight}</Card.Text>
              )}  */}
              {data?.item_description?.length > 0 &&
                data?.item_description.map((item: any, index: any) => (
                  <Card.Text key={index} className={`my-0 py-0 ${ProductCardStyles.product_card_text} `}>
                    {item?.label_name}: {item.value ? item.value : '--'}
                  </Card.Text>
                ))}
            </div>
            <div className='d-flex justify-content-end' >{handleRenderAddToCartBtn()}</div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
