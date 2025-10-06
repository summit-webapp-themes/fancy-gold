import React from 'react';
import Image from 'next/image';
import image from '../public/assets/images/no-data.png';
import styles from '../styles/components/noData.module.scss';

const NoDataFound = ({ title, message }: any) => {
  return (
    <>
      <div className={styles.no_data_state}>
        <div className={styles.no_data_content}>
          <div className={styles.no_data_icon}>
            <Image src={image} width={250} height={250} alt="No Data Image" />
          </div>
          <div className={styles.no_data_state_message}>{title}</div>
          <div className={styles.no_data_state_help}>{message}</div>
        </div>
      </div>
    </>
  );
};

export default NoDataFound;
