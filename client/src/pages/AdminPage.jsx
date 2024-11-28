import { useEffect, useState } from "react";
import AdminDashboard from "../components/adminDashboard/AdminDashboard";
import fetchWithCredentials from "../utils/fetchWithCredentials";
import { API_ENDPOINTS } from "../constants";
import AdminHeader from "../components/adminDashboard/AdminHeader";
import useCustomToast from "../hooks/useCustomToast";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const { showSuccessToast, showErrorToast } = useCustomToast();

  useEffect(() => {
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

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    console.log("Deleting user:", userId);
    try {
      const response = await fetchWithCredentials(
        API_ENDPOINTS.ADMIN.BAN_USER / userId,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        showSuccessToast("User banned successfully");
        const updatedResponse = await fetchWithCredentials(
          API_ENDPOINTS.ADMIN.GET_USERS
        );
        if (updatedResponse.ok) {
          const updatedData = await updatedResponse.json();
          setUsers(updatedData);
        } else {
          console.error("Failed to ban user: ", response.statusText);
          showErrorToast("Failed to ban user: ", response.statusText);
        }
      }
    } catch (error) {
      showErrorToast("Error banning user: ", error);
      throw new Error("Error banning user: ", error);
    }
  };

  const handleResetPassword = async (userId) => {
    console.log("Resetting password for user:", userId);
    await fetchWithCredentials(API_ENDPOINTS.ADMIN.RESET_PASSWORD / userId, {
      method: "POST",
    });
  };

  const handleToggleRole = async (userId) => {
    console.log("Toggling role for user:", userId);
    await fetchWithCredentials(API_ENDPOINTS.ADMIN.TOGGLE_ROLE / userId, {
      method: "POST",
    });
  };

  return (
    <div className="admin-dashboard flex flex-col items-stretch font-poppins bg-custom-gradient h-max p-8">
      <AdminHeader />
      <AdminDashboard
        users={users}
        handleDeleteUser={handleDeleteUser}
        handleResetPassword={handleResetPassword}
        handleToggleRole={handleToggleRole}
      />
    </div>
  );
};

export default AdminPage;
