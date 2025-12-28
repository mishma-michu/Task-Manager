import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const isAuth = true; // TEMP for UI testing

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return children;
}
