import React from "react";
import deleteIcon from "../../assets/delete-icon.png";

const ProfileSection = ({
  data,
  edit,
  handleChange,
  handleLogout,
  onSave,
  setEdit,
  handleAddInterest,
  handleDeleteInterest,
  newInterest,
  setNewInterest, isUploading
}) => {
  const commonInputStyles = "border rounded w-full text-black p-2 h-10";

  const gender = (value) => {
    let gender;

    switch (+value) {
      case 0:
        gender = "Female";
        break;
      case 1:
        gender = "Male";
        break;
      case 2:
        gender = "Both";
        break;
      default:
        gender = "Unknown";
    }

    return gender;
  };

  return (
    <div className="w-3/4 bg-custom-gradient mt-20 shadow-md rounded-lg p-8">
      <div className="flex">
        <div className="w-1/3 flex flex-col items-center border-r pr-4">
          <img
            src={data.profile.photos[0].url ?? "x"}
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
            {edit ? (
              <>
                <div>
                  <input
                    type="text"
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    className={commonInputStyles}
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
                  {data.profile.interests.map((interest, index) => (
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
            ) : (
              <ul className="list-disc pl-5">
                {data.profile.interests.map((interest, index) => (
                  <li key={index}>{interest}</li>
                ))}
              </ul>
            )}
          </div>

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
            <h3 className="text-lg font-semibold">Preferred Location Range</h3>
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
                <option value={0}>Female</option>
                <option value={1}>Male</option>
                <option value={2}>Both</option>
              </select>
            ) : (
              <p>{gender(data.profile.preferredGender)}</p>
            )}
          </div>

          <button
            onClick={() => {
              if(isUploading){ //we don't want them to make changes
                return;
              }
              if (edit) onSave();
              setEdit(!edit);
            }}
            className={`px-6 py-3 text-center bg-transparent text-white border-white rounded-full hover:bg-buttonHover ${isUploading ? "disabled" : ""}`}
          >
            {edit ? "Save Changes" : "Edit Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
