import React from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image';
import image from '../public/assets/images/page-not-found.jpg';
import pageNotFoundStyles from '../styles/components/errorboundary.module.scss';


const PageNotFound = () => {
  const router = useRouter();

  return (
    <>
    <div className="d-flex justify-content-center" style={{height:'80vh',alignItems:'center'}}>
      <div className={`${pageNotFoundStyles.error_content}`}>
        <div className="p-3" style={{ fontSize: '40px' }}>
          <Image src={image} width={250} height={250} alt="Error Image" />
        </div>
        <h4 data-text="PAGE NOT FOUND!">PAGE NOT FOUND!</h4>
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
    </>
  )
}

export default PageNotFound