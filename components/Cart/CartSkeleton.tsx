import React from 'react';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import { RxCross2 } from 'react-icons/rx';
import styles from '../../styles/components/cartProductDetail.module.scss';

const CartSkeleton = () => {
  return (
    <div className="border p-3">
      <div className="row">
        <div className="col-lg-10">
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={5} />
            <br />
            <Placeholder xs={4} />
            <br />
            <Placeholder xs={4} />
          </Placeholder>
        </div>
        <div className="col-lg-2">
          <Placeholder.Button variant="primary" xs={8} />
        </div>
      </div>
      <hr />
      <div className="mt-3">
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder xs={6} size="lg" />
        </Placeholder>
      </div>
            <div className={`row ${styles?.table_header} mt-3`}>
              <div className="col-lg-5 text-center">Products</div>
              <div className="col-lg-2 text-center">Note</div>
              <div className="col-lg-5"></div>
            </div>
      
        {[...Array(3)].map(() => (
          <>
            <div className={`row border-1 ${styles.border}`}>
              <div className={`col-lg-2 p-2`}>
                <Placeholder as={Card.Title} animation="glow">
                  <Placeholder style={{ width: '100%', height: 120 }} />
                </Placeholder>
              </div>
              <div className={`col-lg-5 py-4 ${styles.border}`}>
                <Placeholder as={Card.Title} animation="glow">
                  <Placeholder xs={11} size="xs" />
                  <Placeholder xs={8} size="xs" />
                  <Placeholder xs={7} size="xs" />
                </Placeholder>
              </div>
              <div className={`col-lg-4 pt-3 text-center ${styles.border}`}>
                <Placeholder as={Card.Title} animation="glow">
                  <Placeholder xs={8} size="xs" />
                  <Placeholder xs={8} size="xs" />
                  <Placeholder xs={8} size="xs" />
                </Placeholder>
              </div>
              <div className={`col-lg-1 ${styles.cross_icon_container} `}>
                <RxCross2 />
              </div>
            </div>
          </>
        ))}

    </div>
  );
};

export default CartSkeleton;
