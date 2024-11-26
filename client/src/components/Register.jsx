import Header from "./Header.jsx";
import {useAuth} from "./contexts/Authcontext.jsx";
import {useNavigate} from "react-router-dom";
import {REACT_ROUTES} from "../constants.js";
import useCustomToast from "../hooks/useCustomToast.js";


const RegisterPage = () => {
    const {register} = useAuth();
    const navigate = useNavigate();
    const {showErrorToast} = useCustomToast();

    async function handleSubmit(e) {
        e.preventDefault();
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;

        console.log("email:", email);
        const response = await register(email, password);
        if(response.ok){
            navigate(REACT_ROUTES.REGISTER_DATA);
        }
        else{
            let error = await response.json();
            let msg = Object.values(error).flat().join("\n");
            showErrorToast(msg);
        }
    }

    return (
        <div>
            <Header/>
            <div className="flex flex-col items-stretch font-poppins bg-custom-gradient h-screen">
                <div className="flex flex-col items-center grow justify-center">
                    <div
                        className="bg-transparent rounded-lg shadow-2xl self-center m-10 text-white p-6 max-w-md w-full">
                        <h1 className="text-3xl font-semibold drop-shadow-topbar text-center mb-4 rounded text-red">
                            Register
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-lg font-medium">
                                    Email address:
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    className="border bg-white text-black border-gray-300 p-2 w-full rounded-lg"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-lg font-medium">
                                    Password:
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    className="border bg-white text-black border-gray-300 p-2 w-full rounded-lg"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                            
                            <div className="flex justify-center mt-4">
                                <button
                                    className="bg-transparent text-white px-6 py-3 rounded-full hover:bg-buttonHover border-white">
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
