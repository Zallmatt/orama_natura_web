import React, { useState } from 'react';
import axios from 'axios';

const AddUser = () => {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    // Actualiza el estado al cambiar los valores de los inputs del formulario
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Maneja el envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/register`, userData);
            setMessage('Usuario agregado exitosamente');
            setUserData({ username: '', password: ''}); // Resetear formulario
        } catch (error) {
            setMessage('Error al agregar el usuario: ' + error.response?.data.message);
        }

        setIsLoading(false);
    };

    return (
        <div>
            <h2>Agregar Usuario</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre de Usuario:</label>
                    <input
                        type="text"
                        name="username"
                        value={userData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Agregando...' : 'Agregar Usuario'}
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddUser;
