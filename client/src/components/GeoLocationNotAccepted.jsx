import Header from './Header';
const GeoLocationNotAccepted = () => {
  return (
    <>
      <Header />
      <div className="h-screen flex flex-col items-center justify-center bg-custom-gradient text-white">
        <div className="text-center">
          <p className="font-poppins">Please enable geolocation access in your browser settings.</p>
        </div>
      </div>
    </>
  );
};

export default GeoLocationNotAccepted;
