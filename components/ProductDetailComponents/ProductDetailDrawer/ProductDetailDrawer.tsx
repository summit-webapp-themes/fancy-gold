import { useEffect, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { fetchProductVariant } from '../../../services/api/product-detail-page-api/product-variants-data-api';
import ProductDetailInfo from './ProductDetailInfo';
import { useSelector } from 'react-redux';
import { get_access_token } from '../../../store/slices/auth/token-login-slice';
import { fetchProductDetailData } from '../../../services/api/product-detail-page-api/product-detail-data-api';
import ProductCode from '../ProductDetails/ProductCode';
import variantStyles from '../../../styles/components/productVariants.module.scss';

const ProductDetailDrawer = ({ show, handleClose, data }: any) => {
  const TokenFromStore: any = useSelector(get_access_token);
  const [productDetail, setProductDetail] = useState<any>();
  const [variantsData, setVariantsData] = useState<any>([]);
  const [attributesData, setAttributesData] = useState([]);
  const item_code = data?.name?.split('-')[0];
  const getVariantsData = async () => {
    if (item_code !== undefined) {
      const variantDataAPI = await fetchProductVariant(item_code, TokenFromStore?.token);
      if (variantDataAPI?.data?.message?.msg === 'success') {
        if (variantDataAPI?.data?.message?.data?.variants?.length > 0) {
          setVariantsData(variantDataAPI?.data?.message?.data?.variants);
        } else {
          setVariantsData([]);
        }
        if (variantDataAPI?.data?.message?.data?.attributes?.length > 0) {
          setAttributesData(variantDataAPI?.data?.message?.data?.attributes);
        } else {
          setAttributesData([]);
        }
      }
    }
  };
  const getProductDetailData = async (item_name: any) => {
    if (item_name !== null && item_name !== undefined) {
      const productDetailData = await fetchProductDetailData(item_name, 'INR', TokenFromStore?.token);
      if (productDetailData?.data?.message?.msg === 'Success') {
        setProductDetail(productDetailData?.data?.message?.data[0]);
      }
    }
  };
  useEffect(() => {
    getVariantsData();
    getProductDetailData(data?.name);
  }, [item_code]);
  const getVariantStrings = () => {
    return variantsData?.map((variant: any) => {
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
    });
  };
  const showVariants = variantsData?.length > 0 || variantsData !== null ? getVariantStrings() : [];
  return (
    <Offcanvas show={show} placement="end" onHide={handleClose} style={{ width: '35%' }}>
      <Offcanvas.Header closeButton />
      <Offcanvas.Body>
        <ProductCode data={productDetail} />
        {showVariants?.length > 0 && (
          <label className="px-1">
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
                onClick={(e) => getProductDetailData(variant?.variant_code)}
              >
                {variant.variant_string}
              </button>
            ))}
        </div>
        <ProductDetailInfo data={productDetail} />
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ProductDetailDrawer;
