import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CONSTANTS } from '../services/config/app-config';
import productCardStyles from '../styles/components/productCard.module.scss';

const ProductCard = ({ data }: any) => {
  const imageLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <>
      <div className={`card mx-2 ${productCardStyles.product_card} pt-2`}>
        <div className={` ${productCardStyles.product_card_img}`}>
          <span className="wishlist-icon text-danger">
            <i className="fa fa-heart-o"></i>
          </span>
          <Image
            loader={imageLoader}
            src={data.image !== null && data.image}
            width={100}
            height={500}
            alt="Item Image"
            className={`${productCardStyles.product_code_img}`}
            style={{ width: '100%', height: '100%' }}
            priority={true}
          />
        </div>
        <div className="card-body text-center">
          <Link href={data?.name} className="text-dark text-decoration-none">
            <p className="card-title my-0 product-name"> {data?.name}</p>
          </Link>
          <p className={`card-text my-0 ${productCardStyles.product_card_text}`}>{data?.bom_factory_code}</p>
          <p className={`card-text my-0 ${productCardStyles.product_card_text}`}>Gross wt:{data.weight_per_unit}</p>
          <p className={`card-text my-0 ${productCardStyles.product_card_text}`}>size:{data.length}</p>

          <div className="text-center mt-2">
            <button className={`btn btn-outline-primary text-uppercase mb-0 p-1 ${productCardStyles.add_to_cart_btn}`}>Add To cart</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;