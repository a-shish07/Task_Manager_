import React from 'react';
import AddTask from '../components/AddTask';
import TaskList from '../components/TaskList';

const TaskDashboard = () => {
  return (
    <div className="p-4">
      <h2 className="text-center text-2xl font-bold mb-4">Task Dashboard</h2>
      <AddTask />
      <TaskList />
    </div>
  );
};

export default TaskDashboard;
