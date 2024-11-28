import { useState } from "react";
import banHammer from "../../assets/ban-hammer.png";
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
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filterUsers = searchQuery
    ? users.filter((user) => {
        return (
          user.email.toLowerCase().includes(searchQuery) ||
          user.userName.toLowerCase().includes(searchQuery) ||
          user.roles?.some((role) => role.toLowerCase().includes(searchQuery))
        );
      })
    : users;

  return (
    <div className="min-h-screen bg-custom-gradient mt-20 shadow-md rounded-lg p-8 ">
      <h1 className="text-2xl font-bold mb-6 text-white">Admin Dashboard</h1>

      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by email, username, or role.."
          className="w-full bg-chat-backgroundPrimary text-text-primary p-2 rounded border border-gray-300"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed border-collapse">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="w-1/12 h-12 border px-4 py-2">#</th>
              <th className="w-2/12 min-w-[260.4px] h-12 border px-4 py-2">
                Email
              </th>
              <th className="w-1/12 h-12 border px-4 py-2">Username</th>
              <th className="w-1/12 h-12 border px-4 py-2">Role</th>
              <th className="w-1/12 h-12 border px-4 py-2">Status</th>
              <th className="w-3/12 h-12 border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filterUsers.map((user, index) => (
              <tr
                key={user.id}
                className={
                  index % 2 === 0
                    ? "bg-chat-backgroundSecondary text-text-primary border-accent-primary"
                    : "bg-chat-backgroundPrimary text-text-secondary border-accent-secondary"
                }
              >
                <td className="border px-4 py-2 text-center">{index + 1}</td>
                <td className="border px-4 py-2 text-center">{user.email}</td>
                <td className="border px-4 py-2 text-center min-w-[260.4px]">
                  {user.userName}
                </td>
                <td className="border px-4 py-2 text-center">
                  {getRoleBadge(user.roles)}
                </td>
                <td className="border px-4 py-2 text-center">
                  {getBanStatus(user.isBanned, user.userBanInfo)}
                </td>
                <td className="border px-4 py-2 flex min-h-24 max-h-24 items-center gap-3">
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
                          src={banHammer}
                          alt="🔨"
                          className="w-[69px] h-[69px] inline-block cursor-pointer"
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
