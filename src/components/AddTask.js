import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../features/tasks/taskSlice';

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!title.trim() || !description.trim() || !dueDate.trim()) {
      alert('Please fill in all the details before submitting.');
      return;
    }

    // Dispatch the action with the full task details
    dispatch(addTask({ title, description, dueDate }));
    setTitle(''); // Clear input fields after adding task
    setDescription('');
    setDueDate('');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-purple-600 text-center mb-4">Add a New Task</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          className="w-full p-3 md:p-4 border border-gray-300 rounded-md shadow-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:shadow-outline hover:shadow-xl"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
          className="w-full p-3 md:p-4 border border-gray-300 rounded-md shadow-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:shadow-outline hover:shadow-xl"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-3 md:p-4 border border-gray-300 rounded-md shadow-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:shadow-outline hover:shadow-xl"
        />
        <button
          type="submit"
          className="px-4 md:px-6 py-2 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600 transition duration-300 transform hover:scale-105"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
