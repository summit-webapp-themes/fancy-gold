import { Offcanvas } from 'react-bootstrap';
import ProductDetailInfo from './ProductDetailInfo';
import useProductDetail from '../../../hooks/ProductDetailHook/product-detail-hook';

const ProductDetailDrawer = ({ show, handleClose, data }: any) => {
  const { productImageLoading, productDetailLoading, productDetailData } = useProductDetail();
  console.log(productDetailData,'productDetailData')
  return (
    <Offcanvas show={show} placement="end" onHide={handleClose}>
      <Offcanvas.Header closeButton />
      <Offcanvas.Body>
        <ProductDetailInfo data={data} />
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ProductDetailDrawer;
