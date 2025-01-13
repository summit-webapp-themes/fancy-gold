import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import variantStyles from '../../../styles/components/productVariants.module.scss';
import styles from '../../../styles/components/productCard.module.scss';
import { useSelector } from 'react-redux';
import { selectCart } from '../../../store/slices/cart-slices/cart-local-slice';
const ProductVariants = ({ productDetail, variantsData, attributesData, getProductDetailData, errorMessage, loading }: any) => {
  const router = useRouter();
  const { query } = useRouter();
  const cartList = useSelector(selectCart)?.items;
  const [showVariants, setShowVariants] = useState([]);
  console.log(variantsData, showVariants, 'data111');
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
    if (query?.productId) {
      router.push({
        query: { ...query, productId: variant_code },
      });
    } else {
      getProductDetailData(variant_code);
    }
  };
  const isVariantInCart = (variant_code: any) => {
    return cartList?.length > 0 && cartList?.some((cartItem: any) => cartItem === variant_code);
  };
  useEffect(() => {
    setShowVariants(variantsData?.length > 0 || variantsData !== null ? getVariantStrings() : []);
  }, [variantsData]);

  return (
    <>
      {loading ? (
        <div className={styles.productCode}>
          <span className="spinner-grow spinner-grow-sm px-2" role="status" aria-hidden="true"></span>
          Product Variants Loading...
        </div>
      ) : (
        <>
          {showVariants?.length > 0 && (
            <label className={styles.productCode}>
              <b>Product Variants:</b>
            </label>
          )}
        </>
      )}
      <div className="d-flex flex-wrap mb-2">
        {errorMessage?.length > 0 ? (
          <p className="text-danger m-0">Couldn't load Product variants. {errorMessage}</p>
        ) : (
          showVariants !== null &&
          showVariants?.length > 0 &&
          showVariants.map((variant: any, index: number) => (
            <button
              key={index}
              className={
                variant.variant_code === productDetail?.name
                  ? variantStyles.variant_btn_active
                  : isVariantInCart(variant.variant_code)
                    ? variantStyles.variant_btn_in_cart
                    : variantStyles.variant_btn
              }
              onClick={(e) => handleProductVariant(variant?.variant_code)}
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
