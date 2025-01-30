import { FC } from 'react';

interface DeleteConfirmationModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirmDelete: () => void; // Callback function to confirm deletion
  staffName: string; // Name of the staff member being deleted
}

const DeleteConfirmationModal: FC<DeleteConfirmationModalProps> = ({
  isVisible,
  onClose,
  onConfirmDelete,
  staffName,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96">
        <h2 className="text-xl font-semibold text-red-600">Delete Confirmation</h2>
        <p className="mt-4 text-lg">Are you sure you want to delete {staffName}?</p>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded"
            onClick={onConfirmDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
