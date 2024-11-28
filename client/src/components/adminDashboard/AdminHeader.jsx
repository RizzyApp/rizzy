import { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../ThemeToggle.jsx";
import logoDark from "../../assets/logo-white.png";
import { useAuth } from "../contexts/Authcontext.jsx";
import useCustomToast from "../../hooks/useCustomToast.jsx";

const AdminHeader = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { isLoggedIn, logOut } = useAuth();
  const { showSuccessToast } = useCustomToast();

  const handleThemeChange = (isDark) => {
    setIsDarkMode(isDark);
  };

  return (
    <div className="bg-topbar w-full flex flex-shrink-0 justify-between items-center text-white drop-shadow-topbar p-4  overflow-hidden">
      <div className="flex items-center space-x-4">
        <Link
          onClick={() => {
            showSuccessToast(<>Bye-bye</>);
            logOut();
          }}
          className="logo-container inline-flex gap-2 text-[44px] text-white font-poppins font-semibold mb-0.5 ml-1"
        >
          <img src={logoDark} className="logo h-[50px] mt-2" />
          Rizzy
        </Link>
      </div>
      <div className="switchLoginContainer flex justify-center">
        {isLoggedIn && (
          <button
            onClick={() => {
              showSuccessToast(<>Successfully logged out</>);
              logOut();
            }}
            className="bg-transparent hover:bg-buttonHover px-3 py-2 rounded"
          >
            Logout
          </button>
        )}
        <ThemeToggle onThemeChange={handleThemeChange} />
      </div>
    </div>
  );
};

export default AdminHeader;
