import {useState, useEffect} from "react";
import Header from "../components/Header";
import PhotoGallery from "../components/profile/PhotoGallery";
import ProfileSection from "../components/profile/ProfileSection";
import {API_ENDPOINTS, REACT_ROUTES} from "../constants.js";
import dataURLtoBlob from "../components/profile/utils/dataURLToBlob.js";
import useCustomToast from "../hooks/useCustomToast.jsx";
import {useAuth} from "../components/contexts/Authcontext.jsx";
import {useNavigate} from "react-router-dom";
import {useFetchWithAuth} from "../hooks/useFetchWIthCredentials.js";
import Loading from '../components/Loading.jsx';

const createPictureChangesFormData = (initialPhotos, photoURLs) => {

    const metadata = [];
    const formData = new FormData();

    if (!photoURLs || photoURLs.length < 1) {
        initialPhotos.forEach(photo => {
                metadata.push({id: photo.id, action: "KEEP"});
            }
        )
    } else {
        // Compare photos in the photoURLs array
        photoURLs.forEach(url => {
            const matchingPhoto = initialPhotos.find(photo => photo.url === url);
            if (matchingPhoto) {
                // kept
                metadata.push({id: matchingPhoto.id, action: "KEEP"});
            } else {
                // added
                const file = dataURLtoBlob(url);
                metadata.push({action: "ADD"});
                formData.append("files", file);
            }
        });

        // Compare for removed photos
        initialPhotos.forEach(photo => {
            if (!photoURLs.includes(photo.url)) {
                metadata.push({id: photo.id, action: "DELETE"});
            }
        });
    }

    formData.append("metadata", JSON.stringify(metadata));

    return {metadata, formData};
};

const ProfilePage = () => {
  const [data, setData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { logOut } = useAuth();
  const [newInterest, setNewInterest] = useState("");
  const [initialPhotos, setInitialPhotos] = useState(null);
  const [changedPhotoUrls, setChangedPhotoUrls] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const { showFetchPromiseToast, showErrorToast, showAPIErrorToast, showSuccessToast } =
    useCustomToast();
  const navigate = useNavigate();
  const fetchWithAuth = useFetchWithAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      profile: { ...prevData.profile, [name]: value },
    }));
  };

    const handleLogout = async () => {
        await logOut();
        navigate(REACT_ROUTES.HOME);
    };
    
    const handleCancelChanges = async () => {
        setIsEditing(false);
        await fetchProfileData()
    }
    const handleChangePassword = async (currentPassword, newPassword) => {
        const response = await fetchWithAuth(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ currentPassword, newPassword }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            showErrorToast("Password change failed");
            throw new Error(errorData.message || "Password change failed");
        }
    };

    const handleSaveChanges = async () => {
        setIsUploading(true);
        try {
            const {metadata, formData} = createPictureChangesFormData(initialPhotos, changedPhotoUrls);

            // Prepare the profile update promise
            const profileUpdatePromise = fetchWithAuth(API_ENDPOINTS.USER.PUT_PROFILE, {
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

            // Prepare the photo update promise if there are changes
            let photoUpdatePromise = null;
            if (metadata.some((item) => item.action !== "KEEP")) {
                photoUpdatePromise = fetchWithAuth(API_ENDPOINTS.IMAGE.POST_IMAGE_CHANGES, {
                    method: "POST",
                    body: formData,
                });
            }

            const promises = [profileUpdatePromise];
            if (photoUpdatePromise) {
                promises.push(photoUpdatePromise);
            }

            const results = await showFetchPromiseToast(Promise.all(promises), "Uploaded successfully",
                "uploading...")


        } catch (error) {
            console.error("Error updating profile or photos:", error);
        } finally {
            setIsUploading(false);
        }
    };

    const fetchProfileData = async () => {
        try {
            const response = await fetchWithAuth(API_ENDPOINTS.USER.GET_PROFILE, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const profileData = await response.json();
                setData({profile: profileData});
                setInitialPhotos(profileData.photos);
                setChangedPhotoUrls(null);
            } else {
                console.error("Failed to fetch profile data.");
            }
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    };
    
    useEffect(() => {
        if (!isUploading) {
            fetchProfileData();
        }
    }, [isUploading]);

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

    if (!data) return (
        <><Header/>
            <div
                className="flex flex-col font-poppins bg-custom-gradient h-screen overflow-hidden w-screen justify-center items-center">
                <Loading/>
            </div>
        </>
    );
    
    
    return (
        <>
            <Header/>
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
                    isUploading={isUploading}
                    onCancelChanges={handleCancelChanges}
                    handleChangePassword={handleChangePassword}
                    showErrorToast={showErrorToast}
                    showSuccessToast={showSuccessToast}
                />
                {((initialPhotos && initialPhotos.length >=  1) || isEditing) &&
                    <div className="w-3/4 bg-custom-gradient mt-20 shadow-md rounded-lg p-8">
                        <PhotoGallery isEditing={isEditing} initialImages={initialPhotos.map(p => p.url)}
                                      setChangedPhotoUrls={setChangedPhotoUrls}/>
                    </div>}
            </div>
        </>
    );
};

export default ProfilePage;
