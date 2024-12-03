import reducer, { addTask, toggleTask, deleteTask, setFilter } from './taskSlice';

describe('taskSlice', () => {
  const initialState = {
    tasks: [],
    filter: 'all',
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle addTask', () => {
    const action = addTask('Test Task');
    const nextState = reducer(initialState, action);

    expect(nextState.tasks).toHaveLength(1);
    expect(nextState.tasks[0]).toEqual(
      expect.objectContaining({
        title: 'Test Task',
        completed: false,
      })
    );
    expect(nextState.tasks[0]).toHaveProperty('id');
  });

  it('should handle toggleTask', () => {
    const initialStateWithTasks = {
      tasks: [
        { id: 1, title: 'Task 1', completed: false },
      ],
      filter: 'all',
    };
    const action = toggleTask(1);
    const nextState = reducer(initialStateWithTasks, action);

    expect(nextState.tasks[0].completed).toBe(true); 
  });

  it('should handle deleteTask', () => {
    const initialStateWithTasks = {
      tasks: [
        { id: 1, title: 'Task 1', completed: false },
        { id: 2, title: 'Task 2', completed: false },
      ],
      filter: 'all',
    };
    const action = deleteTask(1);
    const nextState = reducer(initialStateWithTasks, action);

    expect(nextState.tasks).toHaveLength(1);
    expect(nextState.tasks).toEqual([
      { id: 2, title: 'Task 2', completed: false },
    ]);
  });

  it('should handle setFilter', () => {
    const action = setFilter('completed');
    const nextState = reducer(initialState, action);

    expect(nextState.filter).toBe('completed'); 
  });
});
