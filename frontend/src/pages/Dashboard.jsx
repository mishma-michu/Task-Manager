import TaskCard from '../components/TaskCard';
import Pagination from '../components/Pagination';

export default function Dashboard() {
  // Dummy tasks (frontend only)
  const tasks = [
    { id: 1, title: 'Learn React', status: 'Pending' },
    { id: 2, title: 'Build Task App', status: 'Completed' },
    { id: 3, title: 'Commit to GitHub', status: 'Pending' },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <button>Logout</button>
      </div>

      <p className="dashboard-text">
        Welcome! Dashboard UI will be built step by step.
      </p>

      <div className="task-grid">
        {tasks.map(task => (
          <TaskCard key={task.id} title={task.title} status={task.status} />
        ))}
      </div>

      <Pagination />
    </div>
  );
}
