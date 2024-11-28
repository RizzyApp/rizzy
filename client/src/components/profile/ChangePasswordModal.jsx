import { useState } from "react";
import useCustomToast from "../../hooks/useCustomToast";
import PasswordInput from "./PasswordInput";

const ChangePasswordModal = ({ onClose, onSubmit }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { showSuccessToast, showErrorToast } = useCustomToast();

  const handleSubmit = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      showErrorToast("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      showErrorToast("New passwords do not match.");
      return;
    }

    onSubmit(currentPassword, newPassword);
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-custom-gradient p-6 rounded shadow-md w-1/3">
        <h2 className="text-lg font-bold mb-4">Change Password</h2>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Current Password</label>
          <PasswordInput
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">New Password</label>
          <PasswordInput
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Confirm New Password
          </label>
          <PasswordInput
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-transparent text-white px-6 py-3 rounded-full hover:bg-buttonHover border-white mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-transparent text-white px-6 py-3 rounded-full hover:bg-buttonHover border-white"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
