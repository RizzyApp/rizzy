import { useState } from "react";
import deleteIcon from "../../assets/delete-icon.png";
import BanModal from "./BanModel";

const AdminDashboard = ({
  users,
  handleDeleteUser,
  handleResetPassword,
  handleToggleRole,
  showErrorToast,
  showSuccessToast,
  handleUnbanUser,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [banDays, setBanDays] = useState(0);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const openBanModal = (userId) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const closeBanModal = () => {
    setIsModalOpen(false);
    setBanDays(0);
    setSelectedUserId(null);
  };

  const confirmBanUser = async () => {
    if (selectedUserId && banDays > 0) {
      await handleDeleteUser(selectedUserId, banDays);
      closeBanModal();
    } else {
      showErrorToast("Please specify a valid number of days.");
    }
  };

  const getRoleBadge = (role) => {
    const roleColors = {
      Admin: "bg-red-500",
      User: "bg-blue-500",
      VIP: "bg-yellow-500",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-white text-sm ${
          roleColors[role] || "bg-gray-500"
        }`}
      >
        {role}
      </span>
    );
  };

  const getBanStatus = (isBanned, userBanInfo) => {
    console.log(userBanInfo);
    if (isBanned) {
      const formattedDate = new Date(userBanInfo).toLocaleString();

      return <span className="text-red-600">Banned until {formattedDate}</span>;
    }
    return <span className="text-green-600">Active</span>;
  };

  //!TODO Search

  return (
    <div className="w-full bg-custom-gradient mt-20 shadow-md rounded-lg p-8">
      <h1 className="text-2xl font-bold mb-6 text-white">Admin Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Username</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2 w-[300px] max-w-[300px]">
                Status
              </th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.userName}</td>
                <td className="border px-4 py-2">{getRoleBadge(user.roles)}</td>
                <td className="border px-4 py-2 w-[2200px] max-w-[220px]">
                  {getBanStatus(user.isBanned, user.userBanInfo)}
                </td>
                <td className="border px-4 py-2 flex items-center gap-2">
                  <button
                    onClick={() => handleResetPassword(user.id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Reset Password
                  </button>
                  <button
                    onClick={() => handleToggleRole(user.id)}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Toggle Role
                  </button>
                  {user.isBanned ? (
                    <>
                      <button
                        onClick={() => handleUnbanUser(user.id)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      >
                        Unban
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => openBanModal(user.id)}
                        className="bg-transparent"
                      >
                        <img
                          src={deleteIcon}
                          alt="🗑️"
                          className="w-5 h-5 inline-block cursor-pointer"
                        />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <BanModal
        isOpen={isModalOpen}
        banDays={banDays}
        setBanDays={setBanDays}
        onClose={closeBanModal}
        onConfirm={confirmBanUser}
      />
    </div>
  );
};

export default AdminDashboard;
