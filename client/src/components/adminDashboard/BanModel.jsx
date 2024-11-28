import React from "react";

const BanModal = ({ isOpen, banDays, setBanDays, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Ban User</h2>
        <p className="mb-4">Enter the number of days to ban this user:</p>
        <input
          type="number"
          value={banDays}
          min={0}
          onChange={(e) => setBanDays(e.target.value)}
          className="border p-2 rounded w-full mb-4"
          placeholder="Number of days"
        />
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default BanModal;
