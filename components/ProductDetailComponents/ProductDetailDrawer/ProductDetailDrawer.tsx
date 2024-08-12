import { useEffect, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import fetchProductDetailData from '../../../services/api/product-detail-page-apis/get-product-detail';
import fetchProductVariant from '../../../services/api/product-detail-page-apis/get-product-variants';
import { get_access_token } from '../../../store/slices/auth/token-login-slice';
import ProductCode from '../ProductDetails/ProductCode';
import ProductImage from '../ProductDetails/ProductImage';
import ProductVariants from '../ProductDetails/ProductVariants';
import ProductDetailInfo from './ProductDetailInfo';
import DrawerSkeleton from './DrawerSkeleton';
import ImageSkeleton from './ImageSkeleton';
import { CONSTANTS } from '../../../services/config/app-config';

const ProductDetailDrawer = ({ show, handleClose, data }: any) => {
  const TokenFromStore: any = useSelector(get_access_token);
  const { SUMMIT_API_SDK }: any = CONSTANTS;
  const [productDetail, setProductDetail] = useState<any>({});
  const [variantsData, setVariantsData] = useState<any>([]);
  const [errorMessage, setErrorMessageMsg] = useState('');
  const [attributesData, setAttributesData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const getVariantsData = async () => {
    if (data?.variantOf !== null) {
      setLoading(true); // Set loading to true when API call starts
      try {
        const variantDataAPI = await fetchProductVariant(SUMMIT_API_SDK, data?.variantOf, TokenFromStore?.token);
        if (variantDataAPI?.status === 200 && variantDataAPI?.data?.message?.msg === 'success') {
          setErrorMessageMsg('');
          setVariantsData(variantDataAPI?.data?.message?.data?.variants || []);
          setAttributesData(variantDataAPI?.data?.message?.data?.attributes || []);
        } else {
          setErrorMessageMsg('Error fetching variants');
          setVariantsData([]);
        }
      } catch (error) {
        setErrorMessageMsg('Error fetching variants');
        setVariantsData([]);
      } finally {
        setLoading(false); // Set loading to false after API call completes
      }
    } else {
      setVariantsData([]);
    }
  };
  const getProductDetailData = async (productName: string) => {
    const productDetailData = await fetchProductDetailData(SUMMIT_API_SDK, productName, 'INR', TokenFromStore?.token);
    if (productDetailData?.data?.message?.msg === 'Success') {
      setProductDetail(productDetailData?.data?.message?.data[0]);
    }
  };
  const onHide = () => {
    handleClose();
    setVariantsData([]);
    setErrorMessageMsg('');
    setTimeout(() => {
      setProductDetail([]);
    }, 1000);
  };
  useEffect(() => {
    if (data?.productName) {
      getProductDetailData(data?.productName);
    }
    if (data?.variantOf) {
      getVariantsData();
    } else {
      setVariantsData([]);
    }
  }, [data]);
  return (
    <Offcanvas show={show} placement="end" onHide={onHide} backdrop={false}>
      <Offcanvas.Header closeButton />
      <Offcanvas.Body>
        {Object.keys(productDetail).length === 0 ? (
          <>
            <DrawerSkeleton />
            <ImageSkeleton />
          </>
        ) : (
          <>
            <ProductCode data={productDetail} />
            <ProductVariants
              productDetail={productDetail}
              variantsData={variantsData}
              attributesData={attributesData}
              getProductDetailData={getProductDetailData}
              errorMessage={errorMessage}
              loading={loading}
            />
            <ProductDetailInfo data={productDetail} />
            <div className="mt-2">
              <ProductImage image={productDetail?.image} />
            </div>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ProductDetailDrawer;
