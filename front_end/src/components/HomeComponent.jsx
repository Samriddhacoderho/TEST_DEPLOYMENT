import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomeComponent = () => {
  const [products, setProducts] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/products/products`,
          { headers: { Authorization: token } }
        );
        setProducts(res.data.products);
      } catch (err) {
        setMsg('Could not fetch products. Please login.');
      }
    };
    fetchProducts();
  }, []);

  const token = localStorage.getItem('token');
  if (!token) return <div>Please login to view products.</div>;

  return (
    <div>
      <h2>Products</h2>
      {msg && <div>{msg}</div>}
      <ul>
        <li>{products}</li>
      </ul>
    </div>
  );
};

export default HomeComponent;