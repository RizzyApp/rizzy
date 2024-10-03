import React, { useState } from "react";
import Header from "./Header";

const RegisterPage = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  console.log(isFormVisible);

  const toggleFormVisibility = () => {
    setIsFormVisible((prevState) => !prevState);
  };

  return (
    <div className="bg-gradient-to-b from-purple-400 to-pink-400 min-h-screen flex flex-col ">
      <Header />
      {isFormVisible ? (
        <div className="bg-white rounded-lg shadow-lg self-center m-10 p-6 max-w-md w-full">
          <h1 className="text-3xl font-semibold text-center mb-4 rounded text-red">
            Register
          </h1>
          <form className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-lg font-medium">
                Username:
              </label>
              <input
                type="text"
                id="username"
                className="border border-gray-300 p-2 w-full rounded-lg"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg font-medium">
                Email address:
              </label>
              <input
                type="email"
                id="email"
                className="border border-gray-300 p-2 w-full rounded-lg"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-lg font-medium">
                Password:
              </label>
              <input
                type="password"
                id="password"
                className="border border-gray-300 p-2 w-full rounded-lg"
                placeholder="Enter your password"
              />
            </div>
            <button className="bg-gradient-to-b from-purple-400 to-pink-400 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700 transition">
              Register
            </button>
          </form>
        </div>
      ) : (
        <div className="text-center self-center p-20 m-20 content-center">
          <h1 className="text-7xl font-bold font-pacifico m-5">
            Get your rizz up
          </h1>
          <button
            onClick={toggleFormVisibility}
            className="mt-4 bg-blue-600 text-white py-2 px-4"
          >
            Create account
          </button>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
