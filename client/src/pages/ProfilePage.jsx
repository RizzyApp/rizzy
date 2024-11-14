import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useNavigate, useOutletContext } from "react-router-dom";
import PhotoGallery from "../components/profile/PhotoGallery";
import ProfileSection from "../components/profile/ProfileSection";

const initialProfile = {
  name: "Rowan Atkinson",
  age: 69,
  email: "rowan.atkinson@example.com",
  location: "London, UK",
  images: [
    "https://promotions.hu/article/104040/1669900472_mr-bean-teljes-nev-keresztnev-rowan-atkinson-promotions.hu.jpg",
  ],
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
  const [data, setData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useOutletContext();
  const [photos, setPhotos] = useState(null);
  const navigate = useNavigate();
  const [newInterest, setNewInterest] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      profile: { ...prevData.profile, [name]: value },
    }));
  };

  const handleLogout = () => {
    fetch("/api/v1/Auth/Logout", { method: "POST" });
    setIsLoggedIn(false);
    navigate("/");
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
        setIsEditing(false);
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

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

  const handleAddInterest = () => {
    if (newInterest.trim() !== "") {
      setData((prevData) => ({
        profile: {
          ...prevData.profile,
          interests: [...prevData.profile.interests, newInterest],
        },
      }));
      setNewInterest("");
    }
  };

  const handleDeleteInterest = (index) => {
    const updatedInterests = data.profile.interests.filter(
      (_, i) => i !== index
    );
    setData((prevData) => ({
      profile: {
        ...prevData.profile,
        interests: updatedInterests,
      },
    }));
  };

  if (data !== null) console.log(data);
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <div className="flex flex-col items-center font-poppins bg-custom-gradient text-white min-h-screen ">
        <ProfileSection
          data={data}
          edit={isEditing}
          handleChange={handleChange}
          handleLogout={handleLogout}
          setEdit={setIsEditing}
          onSave={handleSaveChanges}
          handleAddInterest={handleAddInterest}
          handleDeleteInterest={handleDeleteInterest}
          newInterest={newInterest}
          setNewInterest={setNewInterest}
        />
        <div className="w-3/4 bg-custom-gradient mt-20 shadow-md rounded-lg p-8">
          <PhotoGallery isEditing={isEditing} initialImages={photos} />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
