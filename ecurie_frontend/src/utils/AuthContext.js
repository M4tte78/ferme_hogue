import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (email, mot_de_passe) => {
    const res = await axios.post('http://localhost:5000/api/auth/login', {
      email,
      mot_de_passe,
    });

    const { token, roles } = res.data;

    localStorage.setItem('token', token);
    localStorage.setItem('roles', JSON.stringify(roles));

    setUser({ token, roles });
    return { token, roles };
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    setUser(null);
    navigate('/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');
    if (token && roles.length > 0) {
      setUser({ token, roles });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
