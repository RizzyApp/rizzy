import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Register from "../components/Register";

function HomePage() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  console.log(isFormVisible);

  const toggleRegVisibility = () => {
    setIsFormVisible((prevState) => !prevState);
  };

  return (
    <>
      <div className="flex flex-col items-stretch font-poppins bg-custom-gradient h-screen">
        <Header />
        <div className="flex flex-col items-center grow justify-center">
          {isFormVisible ? (
            <Register />
          ) : (
            <>
              <div className="slogan text-3xl mb-10 font-pacifico text-[48px] text-white drop-shadow-slogan">
                Get your rizz up
              </div>
              <button
                onClick={toggleRegVisibility}
                className="createaccount bg-transparent text-white px-6 py-3 rounded-full hover:bg-pink-500 border-white"
              >
                Create account
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default HomePage;
