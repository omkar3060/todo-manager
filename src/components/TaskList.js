import React from 'react';
import { List, ListItem, ListItemText, Checkbox, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TaskList = ({ tasks = [], onTaskUpdate }) => {
  const navigate = useNavigate();
    console.log(tasks);
  const handleCheckboxChange = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      onTaskUpdate({ ...task, completed: !task.completed }); // Call the function passed as a prop
    }
  };

  const handleEdit = (taskId) => {
    navigate(`/edit-task/${taskId}`);
  };

  if (tasks.length === 0) {
    return <div>No tasks to display.</div>;
  }

  return (
    <List>
      {tasks.map((task) => (
        <ListItem key={task.id} divider>
          <Checkbox
            checked={task.completed}
            onChange={() => handleCheckboxChange(task.id)}
          />
          <ListItemText primary={task.title} secondary={task.description} />
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleEdit(task.id)}
          >
            Edit
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
