import React from 'react';
import styles from '../../../styles/components/productCard.module.scss';
const ProductCode = ({ data }: any) => {
  return (
    <div className="d-flex ">
      <p className={styles.productCode}>
        <b>Product Code</b> : {data?.name}
        <br />
        <b>Gross weight</b> : {Number(data?.weight_per_unit).toFixed(2)}gm
      </p>
    </div>
  );
};

export default ProductCode;
