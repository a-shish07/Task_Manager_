import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import Header from './components/Header';
import TaskDashboard from './pages/TaskDashboard';

const App = () => {
  return (
    <Router>
      <Header />
      <div className="mt-10">
        <Routes>
          {/* Define the /tasks route for the Task Dashboard */}
          <Route path="/tasks" element={<TaskDashboard />} />
          
          {/* Define the root route */}
          <Route
            path="/"
            element={
              <>
                <AddTask />
                <TaskList />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
