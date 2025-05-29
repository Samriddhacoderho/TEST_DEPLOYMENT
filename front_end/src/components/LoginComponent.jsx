import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const LoginComponent = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [msg, setMsg] = useState('');

  const onSubmit = async (data) => {
    setMsg('');
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, data);
      localStorage.setItem('token', res.data.token); // Save token in localStorage
      setMsg('Login successful!');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 350, margin: '2rem auto', padding: 24, border: '1px solid #eee', borderRadius: 8, background: '#fafbfc' }}>
      <h2 style={{ textAlign: 'center' }}>Login</h2>
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
        Login
      </button>
      {msg && <div style={{ marginTop: 16, textAlign: 'center', color: msg.includes('successful') ? 'green' : 'red' }}>{msg}</div>}
    </form>
  );
};

export default LoginComponent;