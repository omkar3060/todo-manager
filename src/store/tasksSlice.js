import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API_URL = 'https://jsonplaceholder.typicode.com/todos';

// Thunk for fetching tasks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await axios.get(API_URL);
  return response.data.slice(0, 10).map((task) => ({
    ...task,
    description: task.description || 'No description provided',
  }));
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    editTask: (state, action) => {
      const { id, title, description, completed } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.title = title;
        task.description = description;
        task.completed = completed;
      }
    },
    toggleTaskCompletion: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const apiTasks = action.payload;
        const localTasks = state.tasks.filter((task) => task.id > 1735902571343);  // Filtering IDs based on typical Date.now() values
        const uniqueApiTasks = apiTasks.filter(
          (apiTask) => !localTasks.some((task) => task.id === apiTask.id)
        );
        state.tasks = [...localTasks, ...uniqueApiTasks];
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export reducers and selectors
export const { addTask, editTask, toggleTaskCompletion } = tasksSlice.actions;
export const selectAllTasks = (state) => state.tasks.tasks;
export const selectTaskById = (state, taskId) =>
  state.tasks.tasks.find((task) => task.id === taskId);
export const selectCompletedTasks = (state) =>
  state.tasks.tasks.filter((task) => task.completed);

export default tasksSlice.reducer;
