import { toast } from 'react-toastify';
export const ToastNotification = (message: any, type = 'default') => {
  const toastConfig = {
    autoClose: 2000, // Adjust this value to control how long the toast is displayed
    hideProgressBar: false,
  };
  switch (type) {
    case 'success':
      toast.success(message, toastConfig);
      break;
    case 'warning':
      toast.warning(message, toastConfig);
      break;
    case 'error':
      toast.error(message, toastConfig);
      break;
    default:
      toast(message, toastConfig);
  }
};
