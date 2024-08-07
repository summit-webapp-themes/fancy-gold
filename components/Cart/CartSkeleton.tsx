import React from 'react';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import { RxCross2 } from 'react-icons/rx';
import styles from '../../styles/components/cartProductDetail.module.scss';

const CartSkeleton = () => {
  return (
    <div className="border p-2">
      <div className="row">
        <div className="col-lg-10">
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={4} size="xs" />
            <br />
            <Placeholder xs={3} size="xs" />
            <br />
            <Placeholder xs={2} size="xs" />
          </Placeholder>
        </div>
      </div>
      <hr />
      <div className="mt-1">
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder xs={5} size="sm" />
        </Placeholder>
      </div>
      <div className="px-3">
        <div className={`row ${styles?.table_loader_header} mt-1`}>
          <div className="col-lg-5 text-left"></div>
          <div className="col-lg-2 text-left "></div>
          <div className="col-lg-5"></div>
        </div>
      </div>

      {[...Array(3)].map(() => (
        <>
          <div className="px-3">
            <div className={`row  ${styles.border} `}>
              <div className={`col-lg-2 p-2`}>
                <Placeholder as={Card.Title} animation="glow">
                  <Placeholder style={{ width: '70%', height: 70 }} />
                </Placeholder>
              </div>
              <div className={`col-lg-3 `}>
                <Placeholder as={Card.Title} animation="glow">
                  <Placeholder xs={7} size="xs" />
                </Placeholder>
                <Placeholder as={Card.Title} animation="glow">
                  <Placeholder xs={4} size="xs" />
                </Placeholder>
                <Placeholder as={Card.Title} animation="glow">
                  <Placeholder xs={3} size="xs" />
                </Placeholder>
              </div>
              <div className="col-lg-2">
                <Placeholder as={Card.Title} animation="glow">
                  <Placeholder xs={6} size="xs" />
                </Placeholder>
                <Placeholder as={Card.Title} animation="glow">
                  <Placeholder xs={4} size="xs" />
                </Placeholder>
              </div>
              <div className={`col-lg-4 `}>
                <Placeholder as={Card.Title} animation="glow">
                  <Placeholder xs={7} size="xs" />
                </Placeholder>
                <Placeholder as={Card.Title} animation="glow">
                  <Placeholder xs={6} size="xs" />
                </Placeholder>
                <Placeholder as={Card.Title} animation="glow">
                  <Placeholder xs={5} size="xs" />
                </Placeholder>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default CartSkeleton;
