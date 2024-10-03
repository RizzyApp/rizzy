import React from "react";
import { ThreeDots } from "react-loader-spinner";
import Header from "./Header";

const Login = () => {
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
