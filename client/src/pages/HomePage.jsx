import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Register from "../components/Register";

function HomePage() {
  const navigate = useNavigate();
  const [isFormVisible, setIsFormVisible] = useState(false);
  console.log(isFormVisible);

  const toggleRegVisibility = () => {
    setIsFormVisible((prevState) => !prevState);
  };

  const handleNavigate = () => { //ONLY DURING DEVELOPMENT!!!
    
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
              <button
                onClick={() => navigate("/swipe-page")}
                className="absolute bottom-0 right-0"
              >
                Test SwipePage
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default HomePage;
