import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaRegHeart } from 'react-icons/fa6';
import { CONSTANTS } from '../services/config/app-config';
import Card from 'react-bootstrap/Card';
import ProductCardStyles from '../styles/components/productCard.module.scss';
import { useRouter } from 'next/router';

const ProductCard = ({ data }: any) => {
  const {query}=useRouter()
  const imageLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <>
      <Card className={` mx-2 ${ProductCardStyles.product_card} pt-2`}>
        <div className={` ${ProductCardStyles.product_card_img} `}>
          <span className={`${ProductCardStyles.wishlist_icon} text-danger `}>
            {/* <i className="fa fa-heart-o"></i> */}
            <FaRegHeart />
          </span>
          <Image
            loader={imageLoader}
            src={data.image !== null && data.image}
            width={100}
            height={500}
            alt="Item Image"
            className="product-code-img"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <Card.Body className="text-center">
          <Link href={`/product/${query?.category}/${data?.name}`} target="_blank" className="text-dark text-decoration-none">
            <Card.Title className={` my-0 ${ProductCardStyles.product_name}`}> {data?.name}</Card.Title>
          </Link>
          {data?.bom_factory_code ? (
            <Card.Text className={`my-0 ${ProductCardStyles.product_card_text}`}>{data?.bom_factory_code}</Card.Text>
          ) : null}

          <Card.Text className={`my-0 ${ProductCardStyles.product_card_text}`}>Gross wt: {data.weight_per_unit}</Card.Text>
          <Card.Text className={`my-0 ${ProductCardStyles.product_card_text}`}>Size: {data.length}</Card.Text>

          <div className="text-center mt-2">
            <button className={`btn btn-outline-primary text-uppercase mb-0 p-1 ${ProductCardStyles.add_to_cart_btn} `}>Add To cart</button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProductCard;
