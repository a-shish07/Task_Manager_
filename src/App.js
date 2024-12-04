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
        
          <Route path="/tasks" element={<TaskDashboard />} />
        
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
