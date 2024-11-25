import {toast} from 'react-toastify';
import MatchNotificationToast from "../components/MatchNotificationToast.jsx";


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

    const showSuccessToast = (successMessage) => {
        toast.success(successMessage);
    }

    const showErrorToast = (errorMessage) => {
        toast.error(errorMessage);
    }

    const showMatchNotification = (notification) => {
        toast(
            <MatchNotificationToast notification={notification}/>
        )
    }


    return {showPromiseToast, showSuccessToast, showErrorToast, showMatchNotification};
}

export default useCustomToast;