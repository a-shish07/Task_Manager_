import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { reorderTasks } from '../features/tasks/taskSlice';
import TaskItem from './TaskItem';

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const filter = useSelector((state) => state.tasks.filter);
  const dispatch = useDispatch();

  const isOverdue = (dueDate) => {
    const today = new Date();
    const taskDueDate = new Date(dueDate);
    return taskDueDate < today && !isNaN(taskDueDate);
  };

  
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    if (filter === 'overdue') return isOverdue(task.dueDate) && !task.completed;
    return true;
  });

  
  const handleDragEnd = (result) => {
    if (!result.destination) return; 

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    dispatch(reorderTasks({ sourceIndex, destinationIndex }));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="taskList">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="max-w-lg mx-auto mt-4 md:mt-6"
          >
            {filteredTasks.length === 0 ? (
              <p className="text-center text-gray-500">No tasks to display.</p>
            ) : (
              filteredTasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TaskItem task={task} />
                    </div>
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;
