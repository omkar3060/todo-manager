import React from 'react';
import { useDispatch } from 'react-redux';
import { editTask } from '../store/tasksSlice';
import { Button, Select, MenuItem } from '@mui/material';

const EditTask = ({ taskId }) => {
  const dispatch = useDispatch();
  const [status, setStatus] = React.useState(false);

  const handleUpdate = () => {
    dispatch(editTask({ id: taskId, status }));
  };

  return (
    <div>
      <Select value={status} onChange={(e) => setStatus(e.target.value)}>
        <MenuItem value={false}>Pending</MenuItem>
        <MenuItem value={true}>Completed</MenuItem>
      </Select>
      <Button variant="contained" onClick={handleUpdate}>
        Update Task
      </Button>
    </div>
  );
};

export default EditTask;
