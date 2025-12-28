import { Card, CardContent, Typography } from '@mui/material';
import Button from './Button';

export default function TaskCard({ task, onDelete, onEdit }) {
  return (
    <Card
      sx={{
        marginBottom: 2,
        borderLeft: '5px solid #2575fc',
        backgroundColor: '#fff',
        transition: 'transform 0.2s',
        '&:hover': { transform: 'translateY(-5px)' },
      }}
    >
      <CardContent>
        <Typography variant="h6">{task.title}</Typography>
        <Typography color="text.secondary">Status: {task.status}</Typography>

        <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
          <Button text="Edit" onClick={onEdit} />
          <Button text="Delete" onClick={() => onDelete(task._id)} />
        </div>
      </CardContent>
    </Card>
  );
}
