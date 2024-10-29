import { useNavigate } from "react-router-dom";
import CardLoader from "../components/Swipe/CardLoader.jsx";
import Header from "../components/Header.jsx";
import { useEffect, useState } from 'react';

const App = () => {
  const navigate = useNavigate();
  const [coords, setCoords] = useState(null);
  const [geoLocationAccepted, setGeoLocationAccepted] = useState(false);
  const [geoLocationDenied, setGeoLocationDenied] = useState(false);
  const [askPermission, setAskPermission] = useState(false);

  const success = (position) => {
    setCoords(position);
    setGeoLocationAccepted(true); // Set accepted to true
    console.log(position);
  };

  const failed = (error) => {
    console.error("error: ", error);
    setGeoLocationDenied(true); // Set denied to true
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, failed);
  }, [askPermission]);

  if (geoLocationDenied) {
    return (
      <>
        <Header />
      <div className="h-screen flex flex-col items-center justify-center bg-custom-gradient text-white">
        <div className="text-center">
          <h2 className='font-poppins'>Geolocation Access Denied</h2>
          <p className='font-poppins'>Please enable geolocation access in your browser settings.</p>
          <button className='bg-transparent text-white px-6 py-3 rounded-full hover:bg-buttonHover border-white' onClick={() => setAskPermission(prev => !prev)}>
            Try Again
          </button>
        </div>
      </div>
      </>
    );
  }

  if (!geoLocationAccepted) {
    return (
      <>
        <Header />
      <div className="h-screen flex flex-col items-center justify-center bg-custom-gradient text-white">
        <div className="text-center">
          <p className='font-poppins'>Please enable geolocation access in your browser settings.</p>
        </div>
      </div>
      </>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex flex-grow items-center bg-custom-gradient justify-center">
        <CardLoader />
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
