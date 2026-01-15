import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getAllCustomers = () => {
  return axios.get(API_URL);
};

export const createCustomer = (data) => {
  return axios.post(API_URL, data);
};

export const updateCustomer = (id, data) => {
  return axios.put(`${API_URL}/${id}`, data);
};

export const deleteCustomer = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
