import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import {REACT_ROUTES} from "../constants.js";
import {useAuth} from "../components/contexts/Authcontext.jsx";
import {Navigate, } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const {isLoggedIn} = useAuth();

  return (
    <div className=" h-screen overflow-hidden">
      <Header />
      <div className="flex flex-col items-stretch font-poppins bg-custom-gradient h-screen overflow-hidden">
        <div className="flex flex-col items-center flex-grow justify-center">
          <div className="slogan text-3xl mb-10 font-pacifico text-[48px] text-white drop-shadow-slogan">
            Get your rizz up
          </div>
          <button
              onClick={() => navigate(REACT_ROUTES.REGISTER)}
              className="createAccount bg-transparent text-white px-6 py-3 rounded-full hover:bg-buttonHover border-white"
          >
            Create account
          </button>
          <button
              onClick={() => navigate(REACT_ROUTES.SWIPE_PAGE)}
              className="fixed bottom-1 right-0 text-white"
          >
            Test SwipePage
          </button>
          <button
              onClick={() => navigate(REACT_ROUTES.CHAT)}
              className="fixed bottom-1 right-48 text-white"
          >
            Test ChatPage
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
