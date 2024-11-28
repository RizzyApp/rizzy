import CardLoader from "../components/swipe/CardLoader.jsx";
import Header from "../components/Header.jsx";
import {useEffect, useState} from 'react';
import GeoLocationDenied from '../components/GeoLocationDenied.jsx';
import {useAuth} from '../components/contexts/Authcontext.jsx';
import Loading from '../components/Loading.jsx';
import {LOCATION_CACHE_TIME} from "../constants.js";


const SwipePage = () => {
  const { updateUserLocation } = useAuth()
  const [geoLocationAccepted, setGeoLocationAccepted] = useState(false);
  const [geoLocationDenied, setGeoLocationDenied] = useState(false);
  const [askPermission, setAskPermission] = useState(false);

  const saveLocationToLocalStorage = (coords) => {
    const currentTime = new Date().getTime();
    localStorage.setItem("userLocation", JSON.stringify({ coords, time: currentTime }));
  };

  const getCachedLocation = () => {
    const savedLocation = localStorage.getItem("userLocation");
    if (savedLocation) {
      const { coords, time } = JSON.parse(savedLocation);
      if (new Date().getTime() - time < LOCATION_CACHE_TIME) {
        return coords;
      }
    }
    return null;
  };

  const success = async (position) => {
    const coords = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
    saveLocationToLocalStorage(coords); // Cache the location
    const response = await updateUserLocation(coords);
    if (response.ok) {
      setGeoLocationAccepted(true);
    }
  };

  const failed = (error) => {
    console.error("error: ", error);
    setGeoLocationDenied(true);
  };

  useEffect(() => {
    const cachedLocation = getCachedLocation();
    if (cachedLocation) {
      setGeoLocationAccepted(true);
      updateUserLocation(cachedLocation);
    } else {
      navigator.geolocation.getCurrentPosition(success, failed);
    }
  }, [askPermission]);

  if (geoLocationDenied) {
    return <GeoLocationDenied setAskPermission={setAskPermission} />;
  }
  

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex flex-grow items-center bg-custom-gradient justify-center">
        {!geoLocationAccepted ? (<Loading/>) : (<CardLoader />)}
      </div>
    </div>
  );
};

export default SwipePage;
