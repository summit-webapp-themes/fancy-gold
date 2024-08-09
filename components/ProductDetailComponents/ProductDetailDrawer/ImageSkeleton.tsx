import React from 'react'
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';

const ImageSkeleton = () => {
  return (
    <div className='mt-3 pt-3'>
      <Placeholder as={Card.Title} animation="glow">
            <Placeholder style={{ width: '100%', height: 300 }} />
          </Placeholder>
      </div>
  )
}

export default ImageSkeleton