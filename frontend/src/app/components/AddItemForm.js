'use client';
import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

const AddItemForm = ({ onItemAdded }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description) return alert('Sila isi semua medan!');

    try {
      const response = await axios.post(`${API_URL}/items`, {
        name,
        description,
      });
      onItemAdded(response.data);
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Gagal tambah item:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h2>Tambah Item Baru</h2>
      <input
        type="text"
        placeholder="Nama"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <br />
      <textarea
        placeholder="Deskripsi"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <br />
      <button type="submit">Tambah</button>
    </form>
  );
};

export default AddItemForm;
