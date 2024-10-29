
import { useNavigate } from "react-router-dom";
import CardLoader from "../components/Swipe/CardLoader.jsx";
import Header from "../components/Header.jsx";
import { useEffect, useState } from 'react';

const App = () => {
  const navigate = useNavigate();
  const [coords, setCoords] = useState(null);

  const success = (position) =>{
    // console.log("success: ",position)
    setCoords(position)
    console.log(position)
  }
  const failed = (position) => {
    console.error("error: ",position)
  }

  useEffect( () => {
    navigator.geolocation.getCurrentPosition(success, failed);
  }, [])



  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex flex-grow items-center bg-custom-gradient justify-center">
        <CardLoader></CardLoader>
      </div>
      <button
        onClick={() => navigate("/")}
        className="absolute bottom-0 right-0 text-white"
      >
        Back to HomePage
      </button>
    </div>
  );
};

export default App;
