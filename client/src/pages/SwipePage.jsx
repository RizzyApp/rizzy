import { useNavigate } from "react-router-dom";
import CardLoader from "../components/Swipe/CardLoader.jsx";
import Header from "../components/Header.jsx";
import { useEffect, useState } from 'react';
import GeoLocationNotAccepted from '../components/GeoLocationNotAccepted.jsx';
import GeoLocationDenied from '../components/GeoLocationDenied.jsx';
import {REACT_ROUTES} from "../constants.js";

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

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(success, failed);
  // }, [askPermission]);

  // if (geoLocationDenied) {
  //   return (
  //     <GeoLocationDenied setAskPermission={setAskPermission}/>
  //   );
  // }
  //
  // if (!geoLocationAccepted) {
  //   return (
  //     <GeoLocationNotAccepted/>
  //   );
  // }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex flex-grow items-center bg-custom-gradient justify-center">
        <CardLoader />
      </div>
      <button
        onClick={() => navigate(REACT_ROUTES.HOME)}
        className="absolute bottom-0 right-0 text-white"
      >
        Back to HomePage
      </button>
    </div>
  );
};

export default App;
