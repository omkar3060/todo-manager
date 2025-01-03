import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Container, Typography, Box, List, ListItem, ListItemText, IconButton, Checkbox } from '@mui/material';
import { fetchTasks, toggleTaskCompletion } from '../store/tasksSlice';
import AddTaskPage from './AddTaskPage';
import EditIcon from '@mui/icons-material/Edit'; // Import Material UI Edit Icon
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Select tasks and status from the Redux store
  const tasks = useSelector((state) => state.tasks.tasks);
  const taskStatus = useSelector((state) => state.tasks.status);

  useEffect(() => {
    if (taskStatus === 'idle') {
      dispatch(fetchTasks());
    }
  }, [taskStatus, dispatch]);

  const handleAddTaskClick = () => {
    setShowAddTask(!showAddTask);
  };

  const handleToggleCompletion = (taskId) => {
    dispatch(toggleTaskCompletion(taskId));
  };

  const handleEditTask = (taskId) => {
    navigate(`/edit-task/${taskId}`); // Navigate to Edit Task page
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Task List
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleAddTaskClick}
        style={{ marginBottom: '1rem' }}
      >
        {showAddTask ? 'Cancel' : 'Add New Task'}
      </Button>

      {showAddTask && (
        <Box marginBottom={3}>
          <AddTaskPage setShowAddTask={setShowAddTask} />
        </Box>
      )}

      {/* Task List */}
      <List>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <ListItem
              key={task.id}
              divider
              secondaryAction={
                <>
                  <IconButton edge="end" onClick={() => handleToggleCompletion(task.id)}>
                    <Checkbox checked={task.completed} />
                  </IconButton>
                  <IconButton edge="end" onClick={() => handleEditTask(task.id)}>
                    <EditIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemText
                primary={task.title}
                secondary={task.description}
              />
            </ListItem>
          ))
        ) : (
          <Typography variant="h6" align="center">
            No tasks available. Add a new task!
          </Typography>
        )}
      </List>
    </Container>
  );
};

export default HomePage;
