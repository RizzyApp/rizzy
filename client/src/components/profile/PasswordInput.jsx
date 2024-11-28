import { useState } from "react";
import openEye from "../../assets/open-eye.png";
import closedEye from "../../assets/closed-eye.png";

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="relative">
      <input
        type={isPasswordVisible ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border rounded w-full p-2 h-10 text-black pr-10"
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute bg-transparent inset-y-0 right-0 pr-3 flex items-center"
      >
        <img
          src={isPasswordVisible ? openEye : closedEye}
          alt=""
          className="w-5 h-5"
        />
      </button>
    </div>
  );
};

export default PasswordInput;
