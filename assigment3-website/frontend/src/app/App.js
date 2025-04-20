import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', description: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/items')
      .then(res => setItems(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/items', form);
      setItems([...items, res.data]);
      setForm({ name: '', description: '' });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Senarai Item</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nama"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Deskripsi"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          required
        />
        <button type="submit">Tambah Item</button>
      </form>

      <ul>
        {items.map(item => (
          <li key={item._id}>{item.name} - {item.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
