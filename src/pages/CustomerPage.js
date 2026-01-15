import { useEffect, useState } from "react";
import {
  getAllCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../api/customerApi";
import CustomerForm from "../components/CustomerForm";
import "../App.css";

function CustomerPage() {
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [search, setSearch] = useState("");

  // Modal delete
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const res = await getAllCustomers();
    setCustomers(Array.isArray(res.data) ? res.data : res.data.data);
  };

  const handleCreate = async (data) => {
    await createCustomer(data);
    fetchCustomers();
  };

  const handleUpdate = async (data) => {
    await updateCustomer(editingCustomer.id, data);
    setEditingCustomer(null);
    fetchCustomers();
  };

  const openDeleteModal = (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    await deleteCustomer(selectedCustomer.id);
    setShowModal(false);
    setSelectedCustomer(null);
    fetchCustomers();
  };

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
        <h1>Customer Management</h1>

        <div className="search-row">
            <label className="search-label">Tìm kiếm:</label>
            <input
                type="text"
                className="search-input"
                placeholder="Tìm theo tên hoặc email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>


        <CustomerForm
            onSubmit={editingCustomer ? handleUpdate : handleCreate}
            editingCustomer={editingCustomer}
            onCancel={() => setEditingCustomer(null)}
        />
        <div className="table-wrapper">
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Action</th>
                </tr>
                </thead>

                <tbody>
                {filteredCustomers.map((c) => (
                    <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.name}</td>
                    <td>{c.email}</td>
                    <td>{c.phone}</td>
                    <td>{c.address}</td>
                    <td>
                        <div className="action-buttons">
                        <button
                            className="btn-edit"
                            onClick={() => setEditingCustomer(c)}
                        >
                            Edit
                        </button>
                        <button
                            className="btn-delete"
                            onClick={() => openDeleteModal(c)}
                        >
                            Delete
                        </button>
                        </div>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

        {showModal && (
            <div className="modal-overlay">
            <div className="modal">
                <h3>Xác nhận xóa</h3>
                <p>
                Bạn có chắc chắn muốn xóa customer{" "}
                <b>{selectedCustomer?.name}</b> không?
                </p>

                <div className="modal-actions">
                <button
                    className="btn-cancel"
                    onClick={() => setShowModal(false)}
                >
                    Hủy
                </button>
                <button className="btn-delete" onClick={confirmDelete}>
                    Xóa
                </button>
                </div>
            </div>
            </div>
        )}
        </div>
    );
}

export default CustomerPage;
