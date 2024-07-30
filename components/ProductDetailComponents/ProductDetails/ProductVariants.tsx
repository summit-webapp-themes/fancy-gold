import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import variantStyles from '../../../styles/components/productVariants.module.scss';

const ProductVariants = ({ productDetail, variantsData, attributesData, getProductDetailData }: any) => {
  const router = useRouter();
  const { query } = useRouter();
  const [showVariants, setShowVariants] = useState([]);
  const getVariantStrings = () => {
    return (
      variantsData?.length > 0 &&
      variantsData?.map((variant: any) => {
        let variantStringParts: any[] = [];
        attributesData.forEach((attribute: any) => {
          if (attribute.field_name in variant && variant[attribute.field_name] !== null) {
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
  const handleProductVariant = (variant_code: any) => {
    if (query?.product_id) {
      router.push({
        query: { ...query, product_id: variant_code },
      });
    } else {
      getProductDetailData(variant_code);
    }
  };
  useEffect(() => {
    setShowVariants(variantsData?.length > 0 || variantsData !== null ? getVariantStrings() : []);
  }, [variantsData]);
  return (
    <>
      {showVariants?.length > 0 && (
        <label>
          <b>Product Variants:</b>
        </label>
      )}
      <div className="d-flex flex-wrap mb-2">
        {showVariants !== null &&
          showVariants?.length > 0 &&
          showVariants.map((variant: any, index: number) => (
            <button
              key={index}
              className={variant.variant_code === productDetail?.name ? variantStyles.variant_btn_active : variantStyles.variant_btn}
              onClick={(e) => handleProductVariant(variant?.variant_code)}
            >
              {variant.variant_string}
            </button>
          ))}
      </div>
    </>
  );
};

export default ProductVariants;
