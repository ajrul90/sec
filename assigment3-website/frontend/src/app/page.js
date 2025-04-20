'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { deleteItem, getItems, updateItem } from './api/api';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = 'http://localhost:5000';

const Page = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', description: '' });
  const [editMode, setEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState({});

  useEffect(() => {
    const fetchItems = async () => {
      const data = await getItems();
      setItems(data);
    };
    fetchItems();
  }, []);

  const handleAddItem = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${API_URL}/items`, newItem);
    setItems([...items, response.data]);
    setNewItem({ name: '', description: '' });
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    setItems(items.filter(item => item._id !== id));
  };

  const startEditing = (item) => {
    setEditMode(true);
    setCurrentItem(item);
  };

  const handleUpdateItem = async (e) => {
    e.preventDefault();
    const updatedItem = { ...currentItem };
    const response = await updateItem(updatedItem._id, updatedItem);
    setItems(items.map(item => (item._id === response._id ? response : item)));
    setEditMode(false);
    setCurrentItem({});
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">📋 My Items</h1>

      {/* Add Item Form */}
      <form onSubmit={handleAddItem} className="mb-4">
        <div className="row g-2">
          <div className="col-md-5">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
          </div>
          <div className="col-md-5">
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            />
          </div>
          <div className="col-md-2 d-grid">
            <button type="submit" className="btn btn-primary">Add</button>
          </div>
        </div>
      </form>

      {/* Edit Item Form */}
      {editMode && (
        <form onSubmit={handleUpdateItem} className="mb-4">
          <div className="row g-2">
            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={currentItem.name}
                onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
              />
            </div>
            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                placeholder="Description"
                value={currentItem.description}
                onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
              />
            </div>
            <div className="col-md-2 d-grid">
              <button type="submit" className="btn btn-warning">Update</button>
            </div>
          </div>
        </form>
      )}

      {/* Items Display */}
      <div className="row">
        {items.map((item) => (
          <div key={item._id} className="col-md-4 mb-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.description}</p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item._id)}>Delete</button>
                  <button className="btn btn-sm btn-secondary" onClick={() => startEditing(item)}>Edit</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
