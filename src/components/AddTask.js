import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/tasksSlice';
import { TextField, Button } from '@mui/material';

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const newTask = { id: Date.now(), title, description, completed: false };
    dispatch(addTask(newTask));
  };

  return (
    <div>
      <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
      <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth />
      <Button variant="contained" onClick={handleSubmit}>
        Add Task
      </Button>
    </div>
  );
};

export default AddTask;
