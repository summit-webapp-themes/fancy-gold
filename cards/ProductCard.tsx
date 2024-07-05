import Image from 'next/image';
import React from 'react';
import { CONSTANTS } from '../services/config/app-config';
import Link from 'next/link';

const ProductCard = ({ data }: any) => {
  console.log('data', data);
  const imageLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
  };
  return (
    <>
      <div className="card mx-4 product-card pt-3">
        <div className="h-100 product-card-img position-relative">
          <i className="fa-regular fa-heart"></i>
          <Image
            loader={imageLoader}
            src={data.custom_item_image !== null && data.custom_item_image}
            width={100}
            height={500}
            alt="Home Banner images"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <div className="card-body">
          <Link href={data.item_name} className="text-dark text-decoration-none">
            <h6 className="card-title">{data?.item_name}</h6>
          </Link>
          <p className="card-text my-0">Gross wt:{data.weight_per_unit}</p>
          <p className="card-text my-0">size:{data.length}</p>
          <button className="btn btn-outline-primary text-uppercase py-0 mt-2 mb-0 px-2 add-to-cart-btn">Add To cart</button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
