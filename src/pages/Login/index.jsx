// LoginPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './LoginPage.css';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, form);
      login(res.data.token);
      navigate('/admin');
    } catch (err) {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Iniciar sesión</h2>

        <div className="input-container">
          <FaEnvelope className="icon" />
          <input
            name="email"
            type="email"
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>

        <div className="input-container">
          <FaLock className="icon" />
          <input
            name="password"
            type={showPassword ? 'text' : 'password'}
            onChange={handleChange}
            placeholder="Contraseña"
            required
          />
          <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>

        <button type="submit" className="login-btn">Iniciar sesión</button>

        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;