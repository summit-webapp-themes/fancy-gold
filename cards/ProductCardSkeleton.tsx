import React from 'react';
import Placeholder from 'react-bootstrap/Placeholder';
import Card from 'react-bootstrap/Card';
const ProductCardSkeleton = () => {
  return (
    <Card className={`text-left mx-2 h-100 p-0 mb-3`}>
      <Placeholder as={Card.Title} animation="glow">
        <Placeholder style={{ width: '100%', height: 200 }} />
      </Placeholder>
      <Card.Body className="text-left p-0">
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder style={{ width: '75%' }} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder style={{ width: '40%' }} />
        </Placeholder>
      </Card.Body>
    </Card>
  );
};

export default ProductCardSkeleton;
