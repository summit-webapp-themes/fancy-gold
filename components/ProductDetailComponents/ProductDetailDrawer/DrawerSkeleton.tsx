import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';

const DrawerSkeleton = () => {
  return (
    <div>
      <div className="mb-3">
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={5} size="sm" />
          <br />
          <Placeholder xs={4} size="sm" />
        </Placeholder>
      </div>
      <div className="mt-3">
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={7} size="sm" />
        </Placeholder>
      </div>
      <div className='mt-1'>
        <Placeholder as={Card.Title} animation="glow">
          {[...Array(5)].map(() => (
            <span className=" me-2">
              <Placeholder.Button variant="secondary"  xs={1}style={{  height: 30 }} />
            </span>
          ))}
        </Placeholder>
      </div>
      <div className="mt-3">
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder style={{ width: '100%', height: 70 }} />
        </Placeholder>
      </div>
      
      <div className="mt-3">
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder style={{ width: '100%', height: 70 }} />
        </Placeholder>
      </div>
      <div className="mt-3 pt-3">
        <Placeholder as={Card.Title} animation="glow">
          
              <Placeholder style={{ width: '20%', height: 30 }} />{' '}
              <Placeholder style={{ width: '15%', height: 30 }} />
            
        </Placeholder>
      </div>
    </div>
  );
};

export default DrawerSkeleton;
