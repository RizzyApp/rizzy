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

  return (
    <>
      <Header />
      <div className="flex flex-col items-stretch font-poppins bg-custom-gradient h-screen">
        <div className="flex flex-col items-center grow justify-center">
            <>
              <div className="slogan text-3xl mb-10 font-pacifico text-[48px] text-white drop-shadow-slogan">
                Get your rizz up
              </div>
              <button
                onClick={()=>navigate('/register')}
                className="createaccount bg-transparent text-white px-6 py-3 rounded-full hover:bg-buttonHover border-white"
              >
                Create account
              </button>
              <button
                onClick={() => navigate("/swipe-page")}
                className="absolute bottom-0 right-0 text-white"
              >
                Test SwipePage
              </button>
            </>
        </div>
      </div>
    </>
  );
}

export default HomePage;
