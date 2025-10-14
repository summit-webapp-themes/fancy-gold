import React from 'react';
import styles from '../../../styles/components/productCard.module.scss';

const ProductFieldDetails = ({ data }: any) => {
  return (
    <>
      {data?.item_field_details?.length > 0 &&
        data?.item_field_details.map((itemData: any, index: number) => {
          return (
            <p className={`${styles.productCode} my-0`} key={index}>
              <b> {itemData?.label}</b> : {itemData?.value}
            </p>
          );
        })}
    </>
  );
};

export default ProductFieldDetails;
