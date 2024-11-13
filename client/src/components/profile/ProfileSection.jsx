import React from "react";

const ProfileSection = ({ data, edit, handleChange, handleLogout, handleInterestChange, setEdit }) => {
    const commonInputStyles = "border rounded w-full text-black p-2 h-10";

    return (
        <div className="w-3/4 bg-custom-gradient mt-20 shadow-md rounded-lg p-8">
            <div className="flex">
                <div className="w-1/3 flex flex-col items-center border-r pr-4">
                    <img
                        src={data.profile.photos[0].url}
                        alt="Profile"
                        className="w-40 h-40 rounded-full mb-4"
                    />
                    {edit ? (
                        <input
                            type="text"
                            name="name"
                            value={data.profile.name}
                            onChange={handleChange}
                            className={`${commonInputStyles} text-center`}
                        />
                    ) : (
                        <h2 className="text-xl font-semibold">{data.profile.name}</h2>
                    )}
                    {edit ? (
                        <input
                            type="number"
                            name="age"
                            value={data.profile.age}
                            onChange={handleChange}
                            className={`${commonInputStyles} text-center`}
                        />
                    ) : (
                        <p>Age: {data.profile.age}</p>
                    )}
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
                                            onChange={(e) => handleInterestChange(index, e.target.value)}
                                            className={commonInputStyles}
                                        />
                                    ) : (
                                        interest
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <button
                        onClick={() => setEdit(!edit)}
                        className="px-6 py-3 text-center bg-transparent text-white border-white rounded-full hover:bg-buttonHover"
                    >
                        {edit ? "Save Changes" : "Edit Profile"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileSection;
