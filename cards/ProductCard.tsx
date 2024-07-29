import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaRegHeart } from 'react-icons/fa6';
import { IoCart } from 'react-icons/io5';
import { CONSTANTS } from '../services/config/app-config';
import Card from 'react-bootstrap/Card';
import ProductCardStyles from '../styles/components/productCard.module.scss';
import { useRouter } from 'next/router';
import noImage from '../public/assets/images/no_image.png';
const ProductCard = ({ data, handleShow }: any) => {
  console.log(data, 'hh');
  const { query } = useRouter();
  const imageLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <Card className={` ${ProductCardStyles.product_card} pt-2`}>
      <div className={` ${ProductCardStyles.product_card_img} `}>
        <span className={`${ProductCardStyles.wishlist_icon} text-danger `}>
          <FaRegHeart />
        </span>
        <Image
          loader={data.image !== null ? imageLoader : undefined}
          src={data.image !== null ? data.image : noImage}
          width={1200}
          height={900}
          alt="Item Image"
          className={`${ProductCardStyles.product_code_img}`}
          style={{ width: '100%', height: '100%' }}
        />
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
        {/* <div className="text-left ">
          <button
            className={`btn btn-outline-primary text-uppercase mb-0 p-1 ${ProductCardStyles.add_to_cart_btn} `}
            onClick={() => handleShow(data?.name, data?.variant_of)}
          >
            Add To cart
          </button>
        </div> */}
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
