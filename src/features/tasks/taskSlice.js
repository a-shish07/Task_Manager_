import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [], 
  filter: 'all', 
};


const isOverdue = (dueDate) => {
  const today = new Date();
  const taskDueDate = new Date(dueDate);
  return taskDueDate < today && !isNaN(taskDueDate); 
};


const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { title, description, dueDate } = action.payload;
      const newTask = {
        id: Date.now(),
        title,
        description,
        dueDate,
        completed: false,
      };
      state.tasks.push(newTask);
    },
    toggleTask: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    editTask: (state, action) => {
      const { id, title, description, dueDate } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.title = title;
        task.description = description;
        task.dueDate = dueDate;
      }
    },
    reorderTasks: (state, action) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const reorderedTasks = Array.from(state.tasks);
      const [removed] = reorderedTasks.splice(sourceIndex, 1);
      reorderedTasks.splice(destinationIndex, 0, removed);
    
      state.tasks = reorderedTasks; 
    },
    setFilter: (state, action) => {
      state.filter = action.payload; 
    },
  },
});

export const { addTask, toggleTask, deleteTask, editTask, setFilter, reorderTasks  } = taskSlice.actions;
export default taskSlice.reducer;
