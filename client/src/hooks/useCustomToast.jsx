import {useState, useEffect} from 'react';
import {toast} from 'react-toastify';
import MatchNotificationToast from "../components/MatchNotificationToast.jsx";


const translateErrorResponse = async (errorResponse) => {
    let errorData;

    try {
        errorData = await errorResponse.json();
    } catch (e) {
        try {
            errorData = await errorResponse.text();
        } catch {
            errorData = "Oops something happened, try again later";
        }
    }

    let errorMessage = "";

    if (typeof errorData === "string") {
        // Plain text error message
        errorMessage = errorData;
    } else if (errorData.errors) {
        // {errors: [{SomethingError:["a", "b"]}]}
        errorMessage = (
            <>
                {Object.values(errorData.errors)
                    .flat()
                    .map((x, index) => (
                        <div key={index}>{x}</div>
                    ))}
            </>
        );
    } else if (errorData.title) {
        // {"title":"An unexpected error occurred.","status":500,"instance":"/api/v1/Auth/Register"}
        errorMessage = errorData.title;
    } else if (errorData.message) {
        errorMessage = errorData.message;
    } else if (Object.values(errorData).length) {
        // {SomethingError:["a", "b"], SomethingOtherError:["asdf"]}
        errorMessage = (
            <>
                {Object.values(errorData)
                    .flat()
                    .map((x, index) => (
                        <div key={index}>{x}</div>
                    ))}
            </>
        );
    } else {
        // Fallback generic message
        errorMessage = "Oops something happened, try again later";
    }

    return errorMessage;
};

const getIsDarkmode = () => {
    const savedTheme = localStorage.getItem("theme");
    if (!savedTheme) {
        return false;
    }
    return savedTheme;
};

const useCustomToast = () => {
    const [isDarkMode, SetIsDarkMode] = useState(false);
    
    
    useEffect(() => {
        
    }, );
    
    const showFetchPromiseToast = async (promises, successMessage, loadingMessage) => {
        const toastId = toast.loading(loadingMessage);

        try {
            const responses = await promises;
            const failedResponses = responses.filter(response => !response.ok);

            if (failedResponses.length > 0) {
                const firstErrorMessage = await translateErrorResponse(failedResponses[0]);

                toast.update(toastId, {
                    render: (
                        <div>
                            <strong>Error:</strong>
                            <div>{firstErrorMessage}</div>
                        </div>
                    ),
                    type: "error",
                    isLoading: false,
                    autoClose: 5000,
                    pauseOnHover: true,
                    closeOnClick:true,
                    closeButton:true
                    
                });
            } else {
                toast.update(toastId, {
                    render: successMessage,
                    type: "success",
                    isLoading: false,
                    autoClose: 5000,
                    pauseOnHover: true,
                    closeOnClick:true,
                    closeButton:true
                });
            }

            return responses;
        } catch (error) {
            const networkErrorMessage = "A network error occurred. Please try again.";
            toast.update(toastId, {
                render: networkErrorMessage,
                type: "error",
                isLoading: false,
                autoClose: 5000,
                pauseOnHover: true,
                closeOnClick:true,
                closeButton:true
            });
            throw error;
        }
    };


    const showSuccessToast = (successMessage) => {
        toast.success(successMessage);
    }

    const showErrorToast = (errorMessage) => {
        toast.error(errorMessage);
    }
    const showAPIErrorToast = async (errorResponse) => {

        const errorMessage = await translateErrorResponse(errorResponse);
        toast.error(errorMessage);
    }

    const showMatchNotification = (notification) => {
        toast(
            <MatchNotificationToast notification={notification}/>
        )
    }


    return {
        showFetchPromiseToast,
        showSuccessToast,
        showErrorToast,
        showAPIErrorToast,
        showMatchNotification
    };
}

export default useCustomToast;