import {toast} from 'react-toastify';
import MatchNotificationToast from "../components/MatchNotificationToast.jsx";


const useCustomToast = () => {

    //TODO: Write an error message if the request failed
    const showPromiseToast = async (promise, successMessage, loadingMessage) => {
        const response = await toast.promise(
            promise,
            {
                pending: loadingMessage,
                success: successMessage,
                error: ({data}) => {
                    showAPIErrorToast(data);
                }
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
    const showAPIErrorToast = (errorResponse) => {
        // Handle the various error objects the API server can throw

        let errorMessage = "";
        if (errorResponse.errors) {
            // {errors: [{ValamiError:["a", "b"]}]}
            errorMessage = <>{Object.values(errorResponse.errors).flat().map(x => <div>{x}</div>)}</>
        } else if (errorResponse.title) {
            // {"title":"An unexpected error occured.","status":500,"instance":"/api/v1/Auth/Register"}
            errorMessage = errorResponse.title;
        } else if (Object.values(errorResponse)){
            // {ValamiError:["a", "b"], ValamiMasError:["asdf"]}
            errorMessage = <>{Object.values(errorResponse).flat().map(x => <div>{x}</div>)}</>;
        } else {
            errorMessage = "Oops something happened, try again later"
        }
        toast.error(errorMessage);
    }

    const showMatchNotification = (notification) => {
        toast(
            <MatchNotificationToast notification={notification}/>
        )
    }


    return {showPromiseToast, showSuccessToast, showErrorToast, showAPIErrorToast, showMatchNotification};
}

export default useCustomToast;