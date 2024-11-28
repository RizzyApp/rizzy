import Header from "../components/Header.jsx";
import { Link, useNavigate } from "react-router-dom";
import DevelopmentMessage from "../components/DevelopmentMessage.jsx";
import { useAuth } from "../components/contexts/Authcontext.jsx";
import { REACT_ROUTES } from "../constants.js";
import useCustomToast from "../hooks/useCustomToast.jsx";

const IS_DEVELOPMENT = import.meta.env.DEV;

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { showErrorToast } = useCustomToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    const response = await login(email, password);
    if (response[0].ok) {
      console.log("roles", response[1].roles);
      if (response[1].roles.includes("Admin")) {
        navigate(REACT_ROUTES.ADMIN_PAGE);
      } else {
        navigate(REACT_ROUTES.SWIPE_PAGE);
      }
    } else {
      let data = await response.json();
      if (data.Login) {
        showErrorToast(<>{Object.values(data.Login)}</>);
      }
    }
  };

  return (
    <div className=" h-screen overflow-hidden">
      <Header />
      <div className="flex flex-col items-stretch font-poppins bg-custom-gradient h-screen">
        <div className="flex flex-col items-center grow justify-center">
          <div className="bg-transparent rounded-lg shadow-2xl self-center m-10 text-white p-6 max-w-md w-full">
            <h1 className="text-3xl font-semibold drop-shadow-topbar text-center mb-4 rounded text-red">
              Login
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
                />
              </div>
              <div className="flex justify-center mt-4">
                <button className="bg-transparent text-white px-6 py-3 rounded-full hover:bg-buttonHover border-white">
                  Login
                </button>
              </div>
              <div>
                Don’t have an account?{" "}
                <span className="underline">
                  <Link to="/register">Sign up</Link>
                </span>
              </div>
            </form>
            {IS_DEVELOPMENT && <DevelopmentMessage />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
