import axios from 'axios';

const API_URL = 'http://localhost:5000'; // backend kau running sini kan?

// Mendapatkan items
export const getItems = async () => {
  const response = await axios.get(`${API_URL}/items`);
  return response.data;
};

// Menambah item baru
export const createItem = async (item) => {
  const response = await axios.post(`${API_URL}/items`, item);
  return response.data;
};

// Mengemaskini item
export const updateItem = async (id, updatedItem) => {
  const response = await axios.put(`${API_URL}/items/${id}`, updatedItem);
  return response.data;
};

// Menghapus item
export const deleteItem = async (id) => {
  await axios.delete(`${API_URL}/items/${id}`);
};
