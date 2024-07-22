import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CONSTANTS } from '../services/config/app-config';
import ProductDetailModal from '../components/ProductDetailComponents/ProductDetailDrawer/ProductDetailDrawer';

const ProductCard = ({ data }: any) => {
  const imageLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="card mx-2 product-card pt-2">
        <div className=" product-card-img ">
          <span className="wishlist-icon text-danger">
            <i className="fa fa-heart-o"></i>
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
        <div className="card-body text-center">
          <Link href={data?.name} className="text-dark text-decoration-none">
            <p className="card-title my-0 product-name"> {data?.name}</p>
          </Link>
          <p className="card-text my-0 product-card-text">Gross wt:{data.weight_per_unit}</p>
          <p className="card-text my-0 product-card-text">size:{data.length}</p>

          <div className="text-center mt-2">
            <button className="btn btn-outline-primary text-uppercase mb-0 p-1 add-to-cart-btn" onClick={handleShow}>Add To cart</button>
          </div>
        </div>
      </div>
      <ProductDetailModal show={show} handleClose={handleClose} data={data}/>
    </>
  );
};

export default ProductCard;
