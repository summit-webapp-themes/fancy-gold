import React, { useEffect, useState } from 'react';
import variantStyles from '../../../styles/components/productVariants.module.scss';
import styles from '../../../styles/components/productCard.module.scss';
const ProductVariants = ({ productDetail, variantsData, attributesData, getProductDetailData, requestTimeOutMsg }: any) => {
  const [showVariants, setShowVariants] = useState([]);
  console.log(requestTimeOutMsg.length, 'requestTimeOutMsg');
  const getVariantStrings = () => {
    return (
      variantsData?.length > 0 &&
      variantsData?.map((variant: any) => {
        let variantStringParts: any[] = [];
        attributesData.forEach((attribute: any) => {
          if (attribute.field_name in variant) {
            variantStringParts.push(variant[attribute.field_name]);
          }
        });
        return {
          variant_code: variant.variant_code,
          variant_string: variantStringParts.join('-'),
        };
      })
    );
  };
  useEffect(() => {
    setShowVariants(variantsData?.length > 0 || variantsData !== null ? getVariantStrings() : []);
  }, [variantsData]);
  return (
    <>
      {showVariants?.length > 0 && (
        <label className={styles.productCode}>
          <b>Product Variants:</b>
        </label>
      )}
      <div className="d-flex flex-wrap mb-2">
        {requestTimeOutMsg?.length > 0 ? (
          <p className="text-danger">{requestTimeOutMsg}</p>
        ) : (
          showVariants !== null &&
          showVariants?.length > 0 &&
          showVariants.map((variant: any, index: number) => (
            <button
              key={index}
              className={variant.variant_code === productDetail?.name ? variantStyles.variant_btn_active : variantStyles.variant_btn}
              onClick={(e) => getProductDetailData(variant?.variant_code)}
            >
              {variant.variant_string}
            </button>
          ))
        )}
      </div>
    </>
  );
};

export default ProductVariants;
