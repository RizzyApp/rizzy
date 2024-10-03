import React, { useState } from "react";
import Header from "./Header";

const RegisterPage = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  console.log(isFormVisible);

  const toggleFormVisibility = () => {
    setIsFormVisible((prevState) => !prevState);
  };

  return (
    <div className="bg-transparent rounded-lg shadow-2xl self-center m-10 p-6 max-w-md w-full">
      <h1 className="text-3xl font-semibold drop-shadow-topbar text-center mb-4 rounded text-red">
        Register
      </h1>
      <form className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-lg drop-shadow-slogan font-medium"
          >
            Username:
          </label>
          <input
            type="text"
            id="username"
            className="border bg-white border-gray-300 p-2 w-full rounded-lg"
            placeholder="Enter your username"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-lg drop-shadow-slogan font-medium"
          >
            Email address:
          </label>
          <input
            type="email"
            id="email"
            className="border bg-white border-gray-300 p-2 w-full rounded-lg"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-lg drop-shadow-slogan font-medium"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="border bg-white border-gray-300 p-2 w-full rounded-lg"
            placeholder="Enter your password"
          />
        </div>
        <div className="flex justify-center mt-4">
          <button className="bg-transparent text-white px-6 py-3 rounded-full hover:bg-pink-500 border-white">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
