import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ENDPOINTS from "../endpoints.js";

const RegistrationPage = () => {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [bio, setBio] = useState("");
  const [interests, setInterests] = useState("");
  const [preferredMinAge, setMinimumAge] = useState("");
  const [preferredMaxAge, setMaximumAge] = useState("");
  const [preferredLocationRange, setLocationRadius] = useState("");
  const [gender, setGender] = useState("");
  const [preferredGender, setGenderPreference] = useState("");


  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name,
      gender,
      birthdate,
      bio,
      interests: interests.split(',').map(i => i.trim()),
      preferredMinAge,
      preferredMaxAge,
      preferredLocationRange,
      preferredGender
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    };

    async function postUser() {
      const response = await fetch(ENDPOINTS.USER.POST_PROFILE, requestOptions);
      if (response.ok) {
        const data = await response.json();
        navigate("/swipe-page");
      }
    }
    postUser();
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
          />
        </label>

        <label className="mb-2">
          Gender:
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="border rounded w-full p-2 text-black"
          >
            <option value="">Select Gender</option>
            <option value="1">Female</option>
            <option value="2">Male</option>
          </select>
        </label>

        <label className="mb-2">
          Birthdate:
          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="border rounded w-full p-2 text-black"
            required
          />
        </label>

        <label className="mb-2">
          Bio:
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="border rounded w-full p-2 text-black"
          />
        </label>

        <label className="mb-2">
          Interests (comma separated):
          <input
            type="text"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            className="border rounded w-full p-2 text-black"
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
          />
        </label>

        <label className="mb-2">
          Gender Preference:
          <select
            value={preferredGender}
            onChange={(e) => setGenderPreference(e.target.value)}
            className="border rounded w-full p-2 text-black"
          >
            <option value="">Select Gender</option>
            <option value="1">Female</option>
            <option value="2">Male</option>
            <option value="3">Both</option>
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
