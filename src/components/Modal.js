import React from 'react';

const Modal = ({ showModal, closeModal, confirmDelete }) => {
  if (!showModal) return null; // Don't render if modal is not shown

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-4 md:p-6 rounded shadow-lg max-w-sm md:max-w-md">
        <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">Confirm Task Deletion</h2>
        <p className="mb-4 md:mb-6">Are you sure you want to delete this task?</p>
        <div className="flex justify-end space-x-2 md:space-x-3">
          <button
            onClick={closeModal}
            className="px-3 py-1 md:px-4 md:py-2 bg-gray-600 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className="px-3 py-1 md:px-4 md:py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
