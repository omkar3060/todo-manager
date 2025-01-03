import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { editTask } from '../store/tasksSlice';
import { TextField, Button, Container, Typography, Checkbox, FormControlLabel } from '@mui/material';

const EditTaskPage = () => {
  const { id } = useParams();
  const taskId = parseInt(id, 10);
  const task = useSelector((state) =>
    state.tasks.tasks.find((task) => task.id === taskId)
  );

  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [completed, setCompleted] = useState(task?.completed || false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSave = () => {
    if (!task) {
      alert('Task not found!');
      return;
    }

    dispatch(editTask({ id: taskId, title, description, completed }));
    navigate('/'); // Redirect to home page
  };

  if (!task) {
    return (
      <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
        <Typography variant="h5" color="error">
          Task not found.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Edit Task
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
      <FormControlLabel
        control={
          <Checkbox
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
        }
        label="Completed"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        style={{ marginTop: '1rem' }}
      >
        Save Changes
      </Button>
    </Container>
  );
};

export default EditTaskPage;
