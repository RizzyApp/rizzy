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
    const showAPIErrorToast = (errorResponse) => {
        // Handle the various error objects the API server can throw
        
        let errorMessage = "";
        if(errorResponse.errors){
            // {errors: [{ValamiError:["a", "b"]}]}
            errorMessage = Object.values(errorResponse.errors).flat().map(x => <div>{x}</div>)
        }
        else if(errorResponse.title){
            // {"title":"An unexpected error occured.","status":500,"instance":"/api/v1/Auth/Register"}
            errorMessage = errorResponse.title;
        }
        else {
            // {ValamiError:["a", "b"], ValamiMasError:["asdf"]}
            errorMessage = Object.values(errorResponse).flat().map(x => <div>{x}</div>);
        }
        console.log(errorMessage)
        toast.error(errorMessage);
    }

    return {showPromiseToast, showSuccessToast, showErrorToast, showAPIErrorToast};
}

export default useCustomToast;