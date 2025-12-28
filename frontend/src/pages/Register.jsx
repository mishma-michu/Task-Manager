import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!username || !email || !password) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      const res = await api.post('/auth/register', {
        username,
        email,
        password,
      });

      login(res.data.token);
      toast.success('Registration successful');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          style={{ marginTop: '10px' }}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          style={{ marginTop: '10px' }}
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button onClick={handleRegister} style={{ marginTop: '20px' }}>
          Register
        </button>

        <p style={{ marginTop: '10px', textAlign: 'center' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#2575fc' }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
