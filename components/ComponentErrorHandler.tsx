import ErrorHandlerStyles from '../styles/components/error.module.scss';
const ComponentErrorHandler = ({ error }: any) => {
  return <div className={`${ErrorHandlerStyles.error_container}`}>{error ? error : 'Error occurred!'}</div>;
};

export default ComponentErrorHandler;
