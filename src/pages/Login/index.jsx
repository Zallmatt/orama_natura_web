import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';
import axios from 'axios'; // Asegúrate de instalar axios con `npm install axios` d

const Login = () => {
    const [username, setUsername] = useState(''); // Maneja el estado de usuario
    const [password, setPassword] = useState(''); // Maneja el estado de la contraseña
    const [errorMessage, setErrorMessage] = useState(''); // Maneja los mensajes de error
    const [isLoading, setIsLoading] = useState(false); // Controla si el proceso de login está en curso
    const navigate = useNavigate();
    const { login } = useAuth(); // Obtiene la función login desde el contexto
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');
      
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
                username,
                password
            });
    
            if (response.status === 200 && response.data.success) {
                login(response.data.token); // Guarda el token en el contexto/auth store
                navigate('/admin');
            } else {
                setErrorMessage(response.data.message || 'Error de autenticación');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                // Mensaje de error específico del servidor
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Error de conexión con el servidor');
            }
        } finally {
            setIsLoading(false);
        }
    };
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-container">
            <div className="login-card"> {/* Aplicamos la clase login-card */}
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleLogin}> {/* Asocia el evento onSubmit */}
                    <div className="input-container"> {/* Aplica la clase input-container */}
                        <label htmlFor="username"></label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            aria-label="Usuario"
                            placeholder="Usuario"
                        />
                    </div>
                    <div className="input-container"> {/* Aplica la clase input-container */}
                        <label htmlFor="password"></label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                aria-label="Contraseña"
                                placeholder="Contraseña"
                            />
                            <i onClick={togglePasswordVisibility} className={`icon eye-icon ${showPassword ? 'show' : 'hide'}`}></i>
                    </div>
                    {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Mensaje de error */}
                    <button type="submit" className="login-btn" disabled={isLoading}> {/* Botón de submit */}
                        {isLoading ? 'Ingresando...' : 'Ingresar'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
