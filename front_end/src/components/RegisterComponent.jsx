import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const RegisterComponent = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setMsg('');
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/users/register`, data);
      setMsg('Registration successful! You can now log in.');
      setTimeout(() => navigate('/login'), 1200); // Navigate after short delay
    } catch (err) {
      setMsg(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 350, margin: '2rem auto', padding: 24, border: '1px solid #eee', borderRadius: 8, background: '#fafbfc' }}>
      <h2 style={{ textAlign: 'center' }}>Register</h2>
      <div style={{ marginBottom: 16 }}>
        <input
          {...register('name', { required: 'Name is required' })}
          placeholder="Name"
          style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
        />
        {errors.name && <span style={{ color: 'red', fontSize: 12 }}>{errors.name.message}</span>}
      </div>
      <div style={{ marginBottom: 16 }}>
        <input
          {...register('email', { required: 'Email is required' })}
          type="email"
          placeholder="Email"
          style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
        />
        {errors.email && <span style={{ color: 'red', fontSize: 12 }}>{errors.email.message}</span>}
      </div>
      <div style={{ marginBottom: 16 }}>
        <input
          {...register('password', { required: 'Password is required' })}
          type="password"
          placeholder="Password"
          style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
        />
        {errors.password && <span style={{ color: 'red', fontSize: 12 }}>{errors.password.message}</span>}
      </div>
      <button type="submit" style={{ width: '100%', padding: 10, background: '#222', color: '#fff', border: 'none', borderRadius: 4, fontWeight: 'bold' }}>
        Register
      </button>
      <div style={{ marginTop: 12, textAlign: 'center', color: msg.startsWith('Registration successful') ? 'green' : 'red' }}>{msg}</div>
    </form>
  );
};

export default RegisterComponent;