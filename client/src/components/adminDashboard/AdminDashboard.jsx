import deleteIcon from "../../assets/delete-icon.png";

const AdminDashboard = ({
  users,
  handleDeleteUser,
  handleResetPassword,
  handleToggleRole,
}) => {
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
                <td className="border px-4 py-2 flex items-center gap-2">
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="bg-transparent"
                  >
                    <img
                      src={deleteIcon}
                      alt="🗑️"
                      className="w-5 h-5 inline-block cursor-pointer"
                    />
                  </button>
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
