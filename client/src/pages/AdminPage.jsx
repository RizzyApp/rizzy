import { useEffect, useState } from "react";
import AdminDashboard from "../components/adminDashboard/AdminDashboard";
import fetchWithCredentials from "../utils/fetchWithCredentials";
import { API_ENDPOINTS } from "../constants";
import AdminHeader from "../components/adminDashboard/AdminHeader";
import useCustomToast from "../hooks/useCustomToast";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const { showSuccessToast, showErrorToast } = useCustomToast();

  const fetchUsers = async () => {
    try {
      const response = await fetchWithCredentials(
        API_ENDPOINTS.ADMIN.GET_USERS
      );
      if (response.ok) {
        const data = await response.json();
        console.table(data);
        console.log(data);

        setUsers(data);
      } else {
        console.error("Failed to fetch users: ", response.statusText);
        showErrorToast("Failed to fetch users: ", response.statusText);
      }
    } catch (error) {
      showErrorToast("Error fetching users: ", error);
      throw new Error("Error fetching users: ", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId, days) => {
    console.log("Deleting user:", userId);
    console.log("Deleting user:", typeof days);

    try {
      const response = await fetchWithCredentials(
        `${API_ENDPOINTS.ADMIN.BAN_USER}/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(days),
        }
      );

      if (response.ok) {
        showSuccessToast(`User banned for ${days} days successfully`);
        fetchUsers();
      }
    } catch (error) {
      showErrorToast("Error banning user: ", error);
      throw new Error("Error banning user: ", error);
    }
  };

  const handleUnbanUser = async (userId) => {
    try {
      const response = await fetchWithCredentials(
        `${API_ENDPOINTS.ADMIN.UNBAN_USER}/${userId}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        showSuccessToast("User unbanned successfully");
        fetchUsers();
      } else {
        showErrorToast("Failed to unban user.");
      }
    } catch (error) {
      showErrorToast("Error unbanning user:", error);
    }
  };

  const handleResetPassword = async (userId) => {
    console.log("Resetting password for user:", userId);
    try {
      const response = await fetchWithCredentials(
        `${API_ENDPOINTS.ADMIN.RESET_PASSWORD}/${userId}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        showSuccessToast("Password reset successfully");
      } else {
        showErrorToast("Failed to reset password");
      }
    } catch (error) {
      showErrorToast("Error resetting password: ", error.message);
    }
  };

  const handleToggleRole = async (userId) => {
    console.log("Toggling role for user:", userId);
    try {
      const response = await fetchWithCredentials(
        `${API_ENDPOINTS.ADMIN.TOGGLE_ROLE}/${userId}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        showSuccessToast("Role toggled successfully");
        const updatedResponse = await fetchWithCredentials(
          API_ENDPOINTS.ADMIN.GET_USERS
        );
        if (updatedResponse.ok) {
          const updatedData = await updatedResponse.json();
          setUsers(updatedData);
        }
      } else {
        showErrorToast("Failed to toggle role");
      }
    } catch (error) {
      showErrorToast("Error toggling role: ", error.message);
    }
  };

  return (
    <div className="admin-dashboard flex flex-col items-stretch font-poppins bg-custom-gradient h-max p-8">
      <AdminHeader />
      <AdminDashboard
        users={users}
        handleDeleteUser={handleDeleteUser}
        handleResetPassword={handleResetPassword}
        handleToggleRole={handleToggleRole}
        showErrorToast={showErrorToast}
        showSuccessToast={showSuccessToast}
        handleUnbanUser={handleUnbanUser}
      />
    </div>
  );
};

export default AdminPage;
