import React from 'react'
import Image from 'next/image';
import { CONSTANTS } from '../../../services/config/app-config';
import productstyles from '../../../styles/components/productDetail.module.scss'

const ProductImage = ({image}:any) => {
    const imageLoader = ({ src, width, quality }: any) => {
        return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
      };
  return (
    <div className={productstyles.product_image_container}>
        <Image
            loader={imageLoader}
            src={image !== null && image}
            width={400}
            height={400}
            sizes="100vw"
            alt="Item Image"
          />
    </div>
  )
}

export default ProductImage