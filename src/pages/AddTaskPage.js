import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/tasksSlice';
import { TextField, Button, Container, Typography } from '@mui/material';

const AddTaskPage = ({ setShowAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (title.trim() === '' || description.trim() === '') {
      alert('Both title and description are required!');
      return;
    }

    const newTask = {
      id: Date.now(),  // Unique task ID based on timestamp
      title,
      description,
      completed: false,
    };

    dispatch(addTask(newTask));

    // Reset form fields
    setTitle('');
    setDescription('');

    // Hide the form after submission
    if (setShowAddTask) {
      setShowAddTask(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Add New Task
      </Typography>
      <TextField
        label="Task Title"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Task Description"
        fullWidth
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        style={{ marginTop: '1rem' }}
      >
        Add Task
      </Button>
    </Container>
  );
};

export default AddTaskPage;
