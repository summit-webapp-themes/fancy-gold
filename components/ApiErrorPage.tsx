import React from 'react'
import Image from 'next/image';
import image from '../public/assets/images/error-icon.png';
import ErrorBoundaryStyles from '../styles/components/errorboundary.module.scss';

const ApiErrorPage = () => {
  return (
    <div id={`${ErrorBoundaryStyles.error_page}`}>
          <div className={`${ErrorBoundaryStyles.error_content}`}>
            <div className="p-3" style={{ fontSize: '40px' }}>
              <Image src={image} width={250} height={250} alt="Error Image" />
            </div>
            <h4 data-text="Oops, Something Went Wrong!">Oops, Something Went Wrong!</h4>
            <p>
              Sorry, Our engineers are currently fixing something.
              <br />
              We expect them to be done soon.
            </p>
            <div className={`${ErrorBoundaryStyles.error_btns}`}>
              <a href="/">Home Page</a>
            </div>
          </div>
        </div>
  )
}

export default ApiErrorPage