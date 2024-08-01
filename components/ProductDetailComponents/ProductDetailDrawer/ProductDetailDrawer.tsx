import { useEffect, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import fetchProductVariant from '../../../services/api/product-detail-page-apis/get-product-variants';
import ProductDetailInfo from './ProductDetailInfo';
import { useSelector } from 'react-redux';
import { get_access_token } from '../../../store/slices/auth/token-login-slice';
import { selectCart } from '../../../store/slices/cart-slices/cart-local-slice';
import fetchProductDetailData from '../../../services/api/product-detail-page-apis/get-product-detail';
import ProductCode from '../ProductDetails/ProductCode';
import ProductVariants from '../ProductDetails/ProductVariants';
import ProductImage from '../ProductDetails/ProductImage';

const ProductDetailDrawer = ({ show, handleClose, data }: any) => {
  const cartList = useSelector(selectCart)?.items
  console.log(cartList,'cartList')
  const TokenFromStore: any = useSelector(get_access_token);
  const [productDetail, setProductDetail] = useState<any>();
  const [variantsData, setVariantsData] = useState<any>([]);
  const [errorMessage, setErrorMessageMsg] = useState('');
  const [attributesData, setAttributesData] = useState([]);
  const getVariantsData = async () => {
    if (data?.variantOf) {
      const variantDataAPI = await fetchProductVariant(data?.variantOf, TokenFromStore?.token);
      if (variantDataAPI?.status === 200 && variantDataAPI?.data?.message?.msg === 'success') {
        if (variantDataAPI?.data?.message?.data?.variants?.length > 0) {
          setErrorMessageMsg('');
          setVariantsData(variantDataAPI?.data?.message?.data?.variants);
        } else {
          setVariantsData([]);
        }
        if (variantDataAPI?.data?.message?.data?.attributes?.length > 0) {
          setAttributesData(variantDataAPI?.data?.message?.data?.attributes);
        } else {
          setAttributesData([]);
        }
      } else {
        setErrorMessageMsg(variantDataAPI);
      }
    }
  };
  const getProductDetailData = async (productName: string) => {
    const productDetailData = await fetchProductDetailData(productName, 'INR', TokenFromStore?.token);
    if (productDetailData?.data?.message?.msg === 'Success') {
      setProductDetail(productDetailData?.data?.message?.data[0]);
    }
  };
  useEffect(() => {
    if (data?.productName) {
      getProductDetailData(data?.productName);
    }
    if (data?.variantOf) {
      getVariantsData();
    }
  }, [data]);
  return (
    <Offcanvas show={show} placement="end" onHide={handleClose}>
      <Offcanvas.Header closeButton />
      <Offcanvas.Body>
        <ProductCode data={productDetail} />
        <ProductVariants
          productDetail={productDetail}
          variantsData={variantsData}
          attributesData={attributesData}
          getProductDetailData={getProductDetailData}
          errorMessage={errorMessage}
          cartList={cartList}
        />
        <ProductDetailInfo data={productDetail} />
        <div className="mt-2">
          <ProductImage image={productDetail?.image} />
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ProductDetailDrawer;
