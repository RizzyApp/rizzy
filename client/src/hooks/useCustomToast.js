import {toast} from 'react-toastify';


const useCustomToast = () => {

    //TODO: Write an error message if the request failed
    const showPromiseToast = async (promise, successMessage, errorMessage, loadingMessage) => {
        const response = await toast.promise(
            promise,
            {
                pending: loadingMessage,
                success: successMessage,
                error: errorMessage
            }
        )
        console.log(response);
        return response;
    }

    const showSuccessToast =  (successMessage) => {
        toast.success(successMessage);
    }

    const showErrorToast = (errorMessage) => {
        toast.error(errorMessage);
    }


    return {showPromiseToast, showSuccessToast, showErrorToast};
}

export default useCustomToast;