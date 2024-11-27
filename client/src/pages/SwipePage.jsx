import CardLoader from "../components/swipe/CardLoader.jsx";
import Header from "../components/Header.jsx";
import { useEffect, useState } from 'react';
import GeoLocationDenied from '../components/GeoLocationDenied.jsx';
import { useAuth } from '../components/contexts/Authcontext.jsx';
import Loading from '../components/Loading.jsx';
import {useNavigate} from 'react-router-dom';

const App = () => {
  const { updateUserLocation } = useAuth()
  const [geoLocationAccepted, setGeoLocationAccepted] = useState(false);
  const [geoLocationDenied, setGeoLocationDenied] = useState(false);
  const [askPermission, setAskPermission] = useState(false);

  const success = async (position) => {
    const coord = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }
    const response = await updateUserLocation(coord);
    if(response.ok){
      setGeoLocationAccepted(true); // Set accepted to true
    }
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
      <GeoLocationDenied setAskPermission={setAskPermission}/>
    );
  }
  
  // if (!geoLocationAccepted) {
  //   return ()
  // }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex flex-grow items-center bg-custom-gradient justify-center">
        {!geoLocationAccepted ? (<Loading/>) : (<CardLoader />)}
      </div>
    </div>
  );
};

export default App;
