import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, editTask } from '../features/tasks/taskSlice';
import Modal from './Modal';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [editDueDate, setEditDueDate] = useState(task.dueDate);

  const handleDelete = (e) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const confirmDelete = () => {
    dispatch(deleteTask(task.id));
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const toggleTaskCompletion = () => {
    dispatch({ type: 'tasks/toggleTask', payload: task.id });
  };

  const startEditing = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleEditChange = (e, field) => {
    if (field === 'title') setEditTitle(e.target.value);
    if (field === 'description') setEditDescription(e.target.value);
    if (field === 'dueDate') setEditDueDate(e.target.value);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editTitle.trim() && editDescription.trim() && editDueDate.trim()) {
      dispatch(editTask({ 
        id: task.id, 
        title: editTitle.trim(), 
        description: editDescription.trim(), 
        dueDate: editDueDate.trim() 
      }));
      setIsEditing(false);
    } else {
      alert('Please fill in all fields.');
    }
  };

  const cancelEditing = (e) => {
    e.stopPropagation();
    setIsEditing(false);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditDueDate(task.dueDate); 
  };

  return (
    <div
      onClick={toggleTaskCompletion}
      className={`flex flex-col justify-between items-start p-4 mb-4 mx-4 rounded-md shadow cursor-pointer transition ${
        task.completed ? 'bg-gray-200' : 'bg-white'
      }`}
    >
      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="flex flex-col space-y-2 w-full">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => handleEditChange(e, 'title')}
            placeholder="Edit Title"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            value={editDescription}
            onChange={(e) => handleEditChange(e, 'description')}
            placeholder="Edit Description"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="date"
            value={editDueDate}
            onChange={(e) => handleEditChange(e, 'dueDate')}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex space-x-2">
            <button
              type="submit"
              className="px-3 py-1 bg-green-500 text-white font-semibold rounded-md shadow-sm hover:bg-green-600 transition duration-300"
            >
              Save
            </button>
            <button
              onClick={cancelEditing}
              className="px-3 py-1 bg-gray-500 text-white font-semibold rounded-md shadow-sm hover:bg-gray-600 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="flex-1 w-full">
            <h3
              className={`text-lg font-medium ${
                task.completed ? 'line-through text-gray-500' : 'text-gray-800'
              }`}
            >
              {task.title}
            </h3>
            <p className="text-sm text-gray-600">{task.description}</p>
            <p className="text-sm text-gray-400">Due: {task.dueDate}</p>
          </div>
          <div className="flex space-x-2 mt-2">
            <button
              onClick={startEditing}
              className="px-3 py-1 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 transition duration-300"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1 bg-red-500 text-white font-semibold rounded-md shadow-sm hover:bg-red-600 transition duration-300"
            >
              Delete
            </button>
          </div>
        </>
      )}

      
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        confirmDelete={confirmDelete}
      />
    </div>
  );
};

export default TaskItem;
