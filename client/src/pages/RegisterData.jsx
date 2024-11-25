import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../components/contexts/Authcontext.jsx";
import {REACT_ROUTES} from "../constants.js";
import useCustomToast from "../hooks/useCustomToast.js";

const RegistrationPage = () => {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [bio, setBio] = useState("");
  const [interests, setInterests] = useState("");
  const [preferredMinAge, setMinimumAge] = useState(18);
  const [preferredMaxAge, setMaximumAge] = useState("");
  const [preferredLocationRange, setLocationRadius] = useState("");
  const [gender, setGender] = useState("");
  const [preferredGender, setGenderPreference] = useState("");

  const {registerUserProfile, postUserLocation} = useAuth();
  const navigate = useNavigate();
  const {showErrorToast} = useCustomToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(preferredMaxAge<preferredMinAge){
      showErrorToast("The max. age should be greater than the min. age!")
      return;
    }
    let splitInterests = interests.split(',').map(i => i.trim()).filter(m => m.length>0);

    if(splitInterests.length > 20){
      showErrorToast("Too many interests.")
      return;
    }
    const formData = {
      name,
      gender,
      birthdate,
      bio,
      interests: splitInterests,
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
      if(data.errors){
        //let msg = Object.values(data.errors).flat().join(" ");
        //showErrorToast(msg);
        showErrorToast(<>{Object.values(data.errors).flat().map(x => <div>{x}</div>)}</>);
      }
    }
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
          Interests (comma separated):
          <input
            type="text"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            className="border rounded w-full p-2 text-black"
            maxLength="200"
          />
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
            type="number"
            value={preferredLocationRange || ""}
            onChange={(e) => setLocationRadius(e.target.value)}
            className="border rounded w-full p-2 text-black"
            required
            max="144"
          />
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
