import React, { useState } from "react";
import Header from "../components/Header";

const asd = {
  profile: {
    name: "Frederick Dick",
    age: 69,
    email: "frederick.dick@example.com",
    location: "New York, NY",
    bio: "Adventure lover and foodie. Looking to meet someone with a love for the outdoors.",
    interests: ["hiking", "travel", "cooking", "reading"],
    photos: [
      {
        url: "https://example.com/photo1.jpg",
        caption: "At the beach last summer",
      },
      {
        url: "https://example.com/photo2.jpg",
        caption: "Exploring the mountains",
      },
    ],
    preferences: {
      ageRange: [30, 70],
      locationRadius: 50,
      gender: "Female",
    },
  },
};

const ProfilePage = () => {
  const [data, setData] = useState();
  const [edit, setEdit] = useState(false);

  const loadProfile = () => {
    setData(asd);
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-stretch font-poppins bg-custom-gradient h-screen">
        <div className="left-container">
          <div>ProfilePicture</div>
          <div>Full Name</div>
        </div>
        <div className="right-container">
          <div>email</div>
          <div>password</div>
          <div>confirm Password</div>
        </div>
      </div>
    </>
  );
};
export default ProfilePage;
