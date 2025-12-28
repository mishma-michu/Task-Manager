import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import api from '../api/axios';

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }

    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.token);
      toast.success('Login successful');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
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
        <button onClick={handleLogin} style={{ marginTop: '20px' }}>
          Login
        </button>

        {/* Register link */}
        <p style={{ marginTop: '10px', textAlign: 'center' }}>
          Don't have an account?{' '}
          <Link
            to="/register"
            style={{ color: '#2575fc', textDecoration: 'none' }}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
