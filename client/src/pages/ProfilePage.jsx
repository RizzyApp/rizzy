import React, {useState} from "react";
import Header from "../components/Header";
import {useNavigate, useOutletContext} from "react-router-dom";
import PhotoGallery from "../components/profile/PhotoGallery";
import ProfileSection from "../components/profile/ProfileSection";

const initialProfile = {
    name: "Rowan Atkinson",
    age: 69,
    email: "rowan.atkinson@example.com",
    location: "London, UK",
    images: ["https://promotions.hu/article/104040/1669900472_mr-bean-teljes-nev-keresztnev-rowan-atkinson-promotions.hu.jpg"],
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
    const [data, setData] = useState({profile: initialProfile});
    const [isEditing, setIsEditing] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useOutletContext();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setData((prevData) => ({
            profile: {...prevData.profile, [name]: value},
        }));
    };

    const handleLogout = () => {
        fetch("/api/v1/Auth/Logout", {method: "POST"});
        setIsLoggedIn(false);
        navigate("/");
    };

    const handleInterestChange = (index, newValue) => {
        const newInterests = [...data.profile.interests];
        newInterests[index] = newValue;
        setData((prevData) => ({
            profile: {...prevData.profile, interests: newInterests},
        }));
    };

    return (
        <>
            <Header/>
            <div className="flex flex-col items-center font-poppins bg-custom-gradient text-white min-h-screen ">
                <ProfileSection
                    data={data}
                    edit={isEditing}
                    handleChange={handleChange}
                    handleLogout={handleLogout}
                    handleInterestChange={handleInterestChange}
                    setEdit={setIsEditing}
                />
                <div className="w-3/4 bg-custom-gradient mt-20 shadow-md rounded-lg p-8">
                    <PhotoGallery isEditing={isEditing} initialImages={data.profile.images}/>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
