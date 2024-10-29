import React from "react";
import { ThreeDots } from "react-loader-spinner";
import Header from "./Header";
import { useOutletContext, useNavigate } from "react-router-dom";

const Login = () => {
  const [userToken, setUserToken] = useOutletContext();
  const [isLoggedIn, setIsLoggedIn] = useOutletContext();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    };

    async function postUser() {
      const response = await fetch("/api/v1/Auth/Login", requestOptions);
      if (response.ok) {
        const data = await response.json();
        setUserToken(data.token);
        console.log(data.token);
        setIsLoggedIn(true);
        navigate("/swipe-page");
      }
    }
    postUser();
  }

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-custom-gradient font-poppins p-6">
        <h1 className="text-4xl font-bold mb-4 text-white">
          Login is Under Development
        </h1>
        <div className="flex flex-col items-center">
          <ThreeDots
            height="100"
            width="100"
            radius="9"
            color="#fff"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            visible={true}
          />
          <p className="text-lg text-white mt-4">Stay tuned!</p>
        </div>
      </div>
    </>
  );
};

export default Login;
