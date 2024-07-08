import React from 'react';

const ComponentErrorHandler = ({ error }: any) => {
  return <div className="error-container">{error ? error : 'Error occurred!'}</div>;
};

export default ComponentErrorHandler;
