/*
Popup Modal Component

Author : Anil Karki
Date : 6/25/2023

*/

import React from 'react';

// Popup Confirmation Model
function ConfirmationModal({ isOpen, handleCancel, handleConfirm }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white p-6 rounded-md">
        <p className="text-xl mb-4">Are you sure you want to delete this expense?</p>
        <div className="flex justify-end">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={handleConfirm}
          >
            Confirm
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;