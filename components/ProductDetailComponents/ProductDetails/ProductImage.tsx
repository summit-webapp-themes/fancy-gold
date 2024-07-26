import React from 'react'
import { CONSTANTS } from '../../../services/config/app-config';
import Image from 'next/image';

const ProductImage = ({image}:any) => {
    const imageLoader = ({ src, width, quality }: any) => {
        return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
      };
  return (
    <div className='d-flex justify-content-center'>
        <Image
            loader={imageLoader}
            src={image !== null && image}
            width={400}
            height={400}
            alt="Item Image"
          />
    </div>
  )
}

export default ProductImage