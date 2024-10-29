import { useState } from "react";
import Header from "./Header.jsx";
import {  useOutletContext, useNavigate } from 'react-router-dom';


const RegisterPage = () => {

  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();

  function handleSubmit(e){
    e.preventDefault();
    const username = e.target.elements.username.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    };

    async function registerUser() {
      const response = await fetch('/api/v1/Auth/Register', requestOptions);
      if (response.ok) {
        const data = await response.json();
        setUserName(data.username);
        console.log(data.username);
        navigate('/profile');
      }
    }
    registerUser();
  }


  return (
    <>
      <Header />
      <div className="flex flex-col items-stretch font-poppins bg-custom-gradient h-screen">
        <div className="flex flex-col items-center grow justify-center">
        <div className="bg-transparent rounded-lg shadow-2xl self-center m-10 text-white p-6 max-w-md w-full">

          <h1 className="text-3xl font-semibold drop-shadow-topbar text-center mb-4 rounded text-red">
            Register
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-lg font-medium"
              >
                Username:
              </label>
              <input
                type="text"
                name="username"
                className="border bg-white text-black border-gray-300 p-2 w-full rounded-lg"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-lg font-medium"
              >
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
              <label
                htmlFor="password"
                className="block text-lg font-medium"
              >
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
                Register
              </button>
            </div>
          </form>
        </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
