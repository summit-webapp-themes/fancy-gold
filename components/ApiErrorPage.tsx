import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import image from '../public/assets/images/api_error_img.webp';
import ErrorBoundaryStyles from '../styles/components/errorboundary.module.scss';

const ApiErrorPage = () => {
  const router = useRouter();
  return (
    <div className="d-flex justify-content-center">
      <div className={`${ErrorBoundaryStyles.error_content}`}>
        <div className="p-3" style={{ fontSize: '40px' }}>
          <Image src={image} width={250} height={250} alt="Error Image" />
        </div>
        <h4 data-text="Unexpected Error!">Unexpected Error!</h4>
        <p>
          Sorry, We're having trouble processing your request right now.
          <br />
          Please try again later.
        </p>
        <button className="btn btn-primary " onClick={() => router.push('/')}>
          Home Page
        </button>
      </div>
    </div>
  );
};

export default ApiErrorPage;
