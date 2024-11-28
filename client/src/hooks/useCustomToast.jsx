import {useState, useEffect} from 'react';
import {toast} from 'react-toastify';
import MatchNotificationToast from "../components/MatchNotificationToast.jsx";

const baseOptions = {
    autoClose: 6000,
    isLoading: false,
    pauseOnHover: true,
    closeOnClick: true,
    closeButton: true,
};

const getBaseOptions = (colorMode) => ({
    ...baseOptions,
    theme: colorMode
});
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
        return "light";
    }
    return savedTheme;
};

const useCustomToast = () => {
    const [colorMode, SetColorMode] = useState("light");

    useEffect(() => {
        SetColorMode(getIsDarkmode());
    });

    // Function to show a loading toast with promise handling
    const showFetchPromiseToast = async (promises, successMessage, loadingMessage) => {
        const toastId = toast.loading(loadingMessage, getBaseOptions(colorMode));

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
                    ...getBaseOptions(colorMode) 
                });
            } else {
                toast.update(toastId, {
                    render: successMessage,
                    type: "success",
                    ...getBaseOptions(colorMode)  
                });
            }

            return responses;
        } catch (error) {
            const networkErrorMessage = "A network error occurred. Please try again.";
            toast.update(toastId, {
                render: networkErrorMessage,
                type: "error",
                ...getBaseOptions(colorMode)  
            });
            throw error;
        }
    };

    // Show success toast with theme
    const showSuccessToast = (successMessage) => {
        toast.success(successMessage, getBaseOptions(colorMode));
    };

    // Show error toast with theme
    const showErrorToast = (errorMessage) => {
        toast.error(errorMessage, getBaseOptions(colorMode));
    };

    // Show API error toast with theme
    const showAPIErrorToast = async (errorResponse) => {
        const errorMessage = await translateErrorResponse(errorResponse);
        toast.error(errorMessage, getBaseOptions(colorMode));
    };

    // Show match notification toast with theme
    const showMatchNotification = (notification) => {
        toast(<MatchNotificationToast notification={notification} />, getBaseOptions(colorMode));
    };

    return {
        showFetchPromiseToast,
        showSuccessToast,
        showErrorToast,
        showAPIErrorToast,
        showMatchNotification,
    };
};

export default useCustomToast;