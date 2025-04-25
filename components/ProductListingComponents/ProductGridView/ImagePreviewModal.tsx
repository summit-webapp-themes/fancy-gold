import React from 'react';
import { CONSTANTS } from '../../../services/config/app-config';
import Image from 'next/image';
import { Modal } from 'react-bootstrap';

function ImagePreviewModal({ imagePreview, setImagePreview, data }: any) {
  const imageLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
  };
  return (
    <Modal show={imagePreview} onHide={() => setImagePreview(false)} centered size="lg">
      <Modal.Header closeButton />
      <Modal.Body className="d-flex justify-content-center align-items-center">
        <Image
          loader={imageLoader}
          src={data?.image !== null && data?.image}
          width={500} // Adjust as needed
          height={500}
          sizes="100vw"
          alt="Item-Image-Preview"
          className="w-100 img-fluid"
        />
      </Modal.Body>
    </Modal>
  );
}
export default ImagePreviewModal;
