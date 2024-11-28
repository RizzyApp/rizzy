import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../components/contexts/Authcontext.jsx";
import {REACT_ROUTES} from "../constants.js";
import useCustomToast from "../hooks/useCustomToast.jsx"
import deleteIcon from "../assets/delete-icon.png";


const RegistrationPage = () => {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [bio, setBio] = useState("");
  const [interests, setInterests] = useState([]);
  const [interestInput, setInterestInput] = useState("");
  const [preferredMinAge, setMinimumAge] = useState(18);
  const [preferredMaxAge, setMaximumAge] = useState("");
  const [preferredLocationRange, setLocationRadius] = useState("72");
  const [gender, setGender] = useState("");
  const [preferredGender, setGenderPreference] = useState("");

  const {registerUserProfile, postUserLocation} = useAuth();
  const navigate = useNavigate();
  const {showAPIErrorToast, showErrorToast} = useCustomToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(preferredMaxAge<preferredMinAge){
      showErrorToast("The max. age should be greater than the min. age!")
      return;
    }


    const formData = {
      name,
      gender,
      birthdate,
      bio,
      interests,
      preferredMinAge,
      preferredMaxAge,
      preferredLocationRange,
      preferredGender
    };

    const response = await registerUserProfile(formData)
    if(response.ok){
      const locationData= {
        latitude: 47.54,
        longitude: 19.06,
      }
      const response = await postUserLocation(locationData)
      if(response.ok){
        navigate(REACT_ROUTES.SWIPE_PAGE);
      }
    }
    else{
      let data = await response.json();
      showAPIErrorToast(data);
    }
  };

  const handleAddInterest = () => {
    if(interests.length > 10){
      showErrorToast("Too many interests.")
      return;
    }

    const trimmedInput = interestInput.trim();
    if (trimmedInput !== "") {
        setInterests([...interests, trimmedInput]);
        setInterestInput("");
    }
  };

  const handleDeleteInterest = (index) => {
    let copyInterest = [...interests]
    copyInterest.splice(index,1)
    setInterests(copyInterest)
  };


  return (
    <div className="flex flex-col items-center bg-custom-gradient h-screen overflow-auto">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-3/4 bg-custom-gradient text-white rounded-lg p-8 shadow-lg mt-20"
      >
        <h2 className="text-2xl font-semibold mb-4">Register</h2>

        <label className="mb-2">
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded w-full p-2 text-black"
            required
            maxLength="16"
          />
        </label>

        <label className="mb-2">
          Gender:
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="border rounded w-full p-2 text-black"
            required
          >
            <option value="" disabled>Select Gender</option>
            <option value="0">Female</option>
            <option value="1">Male</option>
          </select>
        </label>

        <label className="mb-2">
          Birthdate:
          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="border rounded w-full p-2 text-black"
            min="1924-01-01"
            required
          />
        </label>

        <label className="mb-2">
          Bio:
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="border rounded w-full p-2 text-black"
            maxLength="500"
          />
        </label>

        <label className="mb-2">
          Interests:

          <>
            <div>
              <input
                type="text"
                value={interestInput}
                onChange={(e) => setInterestInput(e.target.value)}
                className="border rounded w-full text-black p-2 h-10"
                placeholder="Enter a new interest"
              />
              <button
                onClick={handleAddInterest}
                className="mt-3 px-6 py-3 ml-2 text-center bg-transparent text-white border-white rounded-full hover:bg-buttonHover"
              >
                Add Interest
              </button>
            </div>

            <ul className="list-disc pl-5 mt-3">
              {interests.map((interest, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center"
                >
                  <span>{interest}</span>
                  <button
                    onClick={() => handleDeleteInterest(index)}
                    className="bg-transparent"
                  >
                    <img
                      src={deleteIcon}
                      alt="🗑️"
                      className="w-5 h-5 inline-block cursor-pointer"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </>
        </label>

        <h3 className="text-lg font-semibold mb-2">Preferences:</h3>

        <label className="mb-2">
          Age Range:
          <input
            type="number"
            value={preferredMinAge}
            onChange={(e) => setMinimumAge(e.target.value)}
            min="18"
            className="border rounded w-full p-2 text-black"
            required
          />
          to
          <input
            type="number"
            value={preferredMaxAge}
            onChange={(e) => setMaximumAge(e.target.value)}
            min="18"
            max="99"
            className="border rounded w-full p-2 text-black"
            required
          />
        </label>

        <label className="mb-2">
          Location Radius (kilometer):

          <input 
            type="range" 
            min={1} 
            max={2000} 
            step={10} 
            value={preferredLocationRange}
            onInput={(e) => setLocationRadius(Number(e.target.value))}
            className="border rounded w-full p-2 text-black"
            required
            />

          <div className="mb-4">
            Selected Radius: {preferredLocationRange || "72"} km
          </div>
        </label>


        <label className="mb-2">
          Gender Preference:
          <select
            value={preferredGender}
            onChange={(e) => setGenderPreference(e.target.value)}
            className="border rounded w-full p-2 text-black"
            required
          >
            <option value="" disabled>Select Gender</option>
            <option value="0">Female</option>
            <option value="1">Male</option>
            <option value="2">Both</option>
          </select>
        </label>

        <button
          type="submit"
          className="mt-5 bg-transparent text-white px-6 py-3 rounded-full hover:bg-buttonHover border-white"
        >
          Go swipe
        </button>
      </form>
    </div>
  );
};

export default RegistrationPage;
