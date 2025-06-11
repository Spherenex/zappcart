import { toast } from 'react-toastify';

/**
 * Reusable toast function for consistent styling across components
 * @param {string} message - The message to display
 * @param {object} options - Custom toast options to override defaults
 */
export const showToast = (message = 'Coming soon!', options = {}) => {
  // Default options for consistent toast styling
  const defaultOptions = {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeButton: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: 'custom-toast',
    style: {
      background: 'rgba(51, 51, 51, 0.9)',
      color: 'white',
      fontSize: '14px',
      fontWeight: '500',
      borderRadius: '8px',
      padding: '12px 20px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    }
  };

  // Merge default options with any custom options
  const mergedOptions = { ...defaultOptions, ...options };

  // Show the toast
  toast.info(message, mergedOptions);
};

/**
 * Success toast with green styling
 * @param {string} message - The success message to display
 * @param {object} options - Custom toast options to override defaults
 */
export const showSuccessToast = (message = 'Success!', options = {}) => {
  showToast(message, {
    className: 'success-toast',
    style: {
      background: 'rgba(76, 175, 80, 0.9)',
      color: 'white',
      fontSize: '14px',
      fontWeight: '500',
      borderRadius: '8px',
      padding: '12px 20px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    },
    ...options
  });
};

/**
 * Error toast with red styling
 * @param {string} message - The error message to display
 * @param {object} options - Custom toast options to override defaults
 */
export const showErrorToast = (message = 'An error occurred!', options = {}) => {
  showToast(message, {
    className: 'error-toast',
    style: {
      background: 'rgba(244, 67, 54, 0.9)',
      color: 'white',
      fontSize: '14px',
      fontWeight: '500',
      borderRadius: '8px',
      padding: '12px 20px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    },
    ...options
  });
};

export default showToast;