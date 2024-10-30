import { useNavigate } from 'react-router-dom';
import Header from './Header';
const GeoLocationDenied = ({setAskPermission}) => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="h-screen flex flex-col items-center justify-center bg-custom-gradient text-white">
        <div className="text-center">
          <h2 className="font-poppins">Geolocation Access Denied</h2>
          <p className="font-poppins">Please enable geolocation access in your browser settings.</p>
          <button
            className="bg-transparent text-white px-6 py-3 rounded-full hover:bg-buttonHover border-white"
            onClick={() => {
              setAskPermission((prev) => !prev);
              navigate("/profile");
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    </>
  );
};

export default GeoLocationDenied;
