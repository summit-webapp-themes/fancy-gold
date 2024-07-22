import { Offcanvas } from 'react-bootstrap';
import ProductDetailInfo from './ProductDetailInfo';

const ProductDetailDrawer = ({ show, handleClose, data }: any) => {
  return (
    <Offcanvas show={show} placement='end' onHide={handleClose}>
        <Offcanvas.Header closeButton/>
        <Offcanvas.Body>
          <ProductDetailInfo data={data}/>
        </Offcanvas.Body>
      </Offcanvas>
  );
};

export default ProductDetailDrawer;
