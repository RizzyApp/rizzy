import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate, useOutletContext } from "react-router-dom";
import PhotoGallery from "../components/PhotoGallery";

const initialProfile = {
  name: "Rowan Atkinson",
  age: 69,
  email: "rowan.atkinson@example.com",
  location: "London, UK",
  bio: "Comedian and actor best known for bringing laughter to the world as Mr. Bean. A quiet soul with a love for cars and comedy.",
  interests: ["cars", "comedy", "acting", "writing"],
  photos: [
    {
      url: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Atkinson_Rowan.jpg",
      caption: "On set as Mr. Bean",
    },
    {
      url: "https://example.com/photo2.jpg",
      caption: "At a car show with my favorite vintage car",
    },
  ],
  preferences: {
    ageRange: [40, 75],
    locationRadius: 30,
    gender: "Female",
  },
};

const ProfilePage = () => {
  const [data, setData] = useState(null); //{ profile: initialProfile }
  const [edit, setEdit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useOutletContext();
  const navigate = useNavigate();
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch("/api/v1/User/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const profileData = await response.json();
          console.log("pd ", profileData);

          setData({ profile: profileData });
          const photosWithPlaceholders = [
            ...profileData.photos,
            ...Array(6 - profileData.photos.length).fill(null),
          ];
          setPhotos(photosWithPlaceholders);

          console.log("photos ", photos);
        } else {
          console.error("Failed to fetch profile data.");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  if (data !== null) console.log(data);
  if (!data) return <div>Loading...</div>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      profile: { ...prevData.profile, [name]: value },
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch("/api/v1/User/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.profile.name,
          bio: data.profile.bio,
          interests: data.profile.interests,
          preferredMinAge: data.profile.preferredMinAge,
          preferredMaxAge: data.profile.preferredMaxAge,
          preferredLocationRange: data.profile.preferredLocationRange,
          preferredGender: data.profile.preferredGender,
        }),
      });

      if (response.ok) {
        console.log("Profile updated successfully");
        setEdit(false);
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleLogout = () => {
    fetch("/api/v1/Auth/Logout", { method: "POST" });
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleInterestChange = (index, newValue) => {
    const newInterests = [...data.profile.interests];
    newInterests[index] = newValue;
    setData((prevData) => ({
      profile: { ...prevData.profile, interests: newInterests },
    }));
  };

  const commonInputStyles = "border rounded w-full text-black p-2 h-10";

  return (
    <>
      <Header />
      <div className="flex flex-col items-center font-poppins bg-custom-gradient text-white min-h-screen ">
        {/* Profile Section */}
        <div className="w-3/4 bg-custom-gradient mt-20 shadow-md rounded-lg p-8">
          <div className="flex">
            <div className="w-1/3 flex flex-col items-center border-r pr-4">
              <img
                src={data.profile.photos[0] ?? "x"}
                alt="Profile"
                className="w-40 h-40 rounded-full mb-4"
              />

              <h2 className="text-xl font-semibold">{data.profile.name}</h2>

              <p>Age: {data.profile.age}</p>

              <button
                onClick={handleLogout}
                className="mt-3 px-6 py-3 text-center bg-transparent text-white border-white rounded-full hover:bg-buttonHover"
              >
                Logout
              </button>
            </div>

            <div className="w-2/3 pl-8 flex flex-col gap-4">
              <div>
                <h3 className="text-lg font-semibold">Email:</h3>
                {edit ? (
                  <input
                    type="email"
                    name="email"
                    value={data.profile.email}
                    onChange={handleChange}
                    className={commonInputStyles}
                  />
                ) : (
                  <p>{data.profile.email}</p>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold">Bio:</h3>
                {edit ? (
                  <textarea
                    name="bio"
                    value={data.profile.bio}
                    onChange={handleChange}
                    className={`${commonInputStyles} h-20`}
                  />
                ) : (
                  <p>{data.profile.bio}</p>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold">Interests:</h3>
                <ul className="list-disc pl-5">
                  {data.profile.interests.map((interest, index) => (
                    <li key={index}>
                      {edit ? (
                        <input
                          type="text"
                          value={interest}
                          onChange={(e) =>
                            handleInterestChange(index, e.target.value)
                          }
                          className={commonInputStyles}
                        />
                      ) : (
                        interest
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* this is new stuff Mark */}

              <div>
                <h3 className="text-lg font-semibold">Preferred Minimum Age</h3>
                {edit ? (
                  <input
                    type="number"
                    name="preferredMinAge"
                    min={18}
                    value={data.profile.preferredMinAge}
                    onChange={handleChange}
                    className={commonInputStyles}
                  />
                ) : (
                  <p>{data.profile.preferredMinAge}</p>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold">Preferred Maximum Age</h3>
                {edit ? (
                  <input
                    type="number"
                    name="preferredMaxAge"
                    value={data.profile.preferredMaxAge}
                    onChange={handleChange}
                    className={commonInputStyles}
                  />
                ) : (
                  <p>{data.profile.preferredMaxAge}</p>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold">
                  Preferred Location Range
                </h3>
                {edit ? (
                  <input
                    type="number"
                    name="preferredLocationRange"
                    value={data.profile.preferredLocationRange}
                    onChange={handleChange}
                    className={commonInputStyles}
                  />
                ) : (
                  <p>{data.profile.preferredLocationRange + " km"}</p>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold">Preferred Gender:</h3>
                {edit ? (
                  <select
                    name="preferredGender"
                    value={data.profile.preferredGender}
                    onChange={handleChange}
                    className={commonInputStyles}
                  >
                    <option value={0}>Male</option>
                    <option value={1}>Female</option>
                    <option value={2}>Both</option>
                  </select>
                ) : (
                  <p>{data.profile.preferredGender}</p>
                )}
              </div>

              <button
                onClick={() => {
                  if (edit) handleSaveChanges();
                  setEdit(!edit);
                }}
                className="px-6 py-3 text-center bg-transparent text-white border-white rounded-full hover:bg-buttonHover"
              >
                {edit ? "Save Changes" : "Edit Profile"}
              </button>
            </div>
          </div>
        </div>

        {/* Photo Gallery Section */}
        <div className="w-3/4 bg-custom-gradient mt-20 shadow-md rounded-lg p-8">
          <PhotoGallery photos={photos} />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
