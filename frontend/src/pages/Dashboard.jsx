import { useState, useEffect, useContext } from 'react';
import TaskCard from '../components/TaskCard';
import Pagination from '../components/Pagination';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import { toast } from 'react-toastify';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { TextField, MenuItem } from '@mui/material';

export default function Dashboard() {
  const { logout } = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all'); // pending/completed/all
  const [page, setPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [titleInput, setTitleInput] = useState('');
  const [statusInput, setStatusInput] = useState('pending');
  const [totalTasks, setTotalTasks] = useState(0);
  const totalPages = Math.ceil(totalTasks / 9);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks', {
        params: { page, limit: 9, status: filter, search },
      });
      setTasks(res.data.tasks);
      setTotalTasks(res.data.total);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch tasks');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [page, filter, search]);

  // Delete task
  const deleteTask = async id => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
      toast.success('Task deleted');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete task');
    }
  };

  const openModal = (task = null) => {
    setEditTask(task);
    if (task) {
      setTitleInput(task.title);
      setStatusInput(task.status);
    } else {
      setTitleInput('');
      setStatusInput('pending');
    }
    setModalOpen(true);
  };

  // Save task (create or update)
  const saveTask = async () => {
    try {
      if (editTask) {
        await api.put(`/tasks/${editTask._id}`, {
          title: titleInput,
          status: statusInput,
        });
        toast.success('Task updated');
      } else {
        await api.post('/tasks', {
          title: titleInput,
          status: statusInput,
        });
        toast.success('Task added');
      }

      await fetchTasks();
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error('Failed to save task');
    }
  };

  return (
    <div className="dashboard">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2 className="page-title">Dashboard</h2>
        <Button text="Logout" onClick={logout} />
      </div>

      <div
        style={{
          marginBottom: '20px',
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
        }}
      >
        <TextField
          label="Search tasks"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <TextField
          select
          label="Filter by status"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </TextField>

        <Button text="Add Task" onClick={() => openModal()} />
      </div>

      <div className="task-grid">
        {tasks.map(task => (
          <TaskCard
            key={task._id}
            task={task}
            onDelete={deleteTask}
            onEdit={() => openModal(task)}
          />
        ))}
      </div>

      {/* Pagination – show only if more than 1 page  */}
      {totalPages > 1 && (
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      )}

      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <h3>{editTask ? 'Edit Task' : 'Add Task'}</h3>
          <TextField
            fullWidth
            label="Title"
            value={titleInput}
            onChange={e => setTitleInput(e.target.value)}
            style={{ marginBottom: '15px' }}
          />
          <TextField
            fullWidth
            select
            label="Status"
            value={statusInput}
            onChange={e => setStatusInput(e.target.value)}
            style={{ marginBottom: '15px' }}
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </TextField>
          <Button text="Save" onClick={saveTask} />
        </Modal>
      )}
    </div>
  );
}
