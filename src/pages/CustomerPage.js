import { useEffect, useState } from "react";
import {
  getAllCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../api/customerApi";
import CustomerForm from "../components/CustomerForm";
import "../App.css";
import { toast } from "react-toastify";


function CustomerPage() {
    const [customers, setCustomers] = useState([]);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [search, setSearch] = useState("");

    const [serverError, setServerError] = useState(null);

    const [resetKey, setResetKey] = useState(0);

//   Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

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
        try {
            await createCustomer(data);
            setServerError(null);
            setResetKey((k) => k + 1); // Reset form
            toast.success("Thêm customer thành công!");
            fetchCustomers();
        } catch (err) {
            if (err.response?.status === 409) {
                setServerError(err.response.data);
            }
        }
    };


    const handleUpdate = async (data) => {
        try {
            await updateCustomer(editingCustomer.id, data);
            setEditingCustomer(null);
            setServerError(null);
            setResetKey((k) => k + 1); // Reset form
            toast.success("Cập nhật customer thành công!");
            fetchCustomers();
        } catch (err) {
            if (err.response?.status === 409) {
                setServerError(err.response.data);
            }
        }
    };


    const openDeleteModal = (customer) => {
        setSelectedCustomer(customer);
        setShowModal(true);
        toast.success("Xóa customer thành công!");
        fetchCustomers();
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

    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedCustomers = filteredCustomers.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [search]);


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
                key={resetKey}
                onSubmit={editingCustomer ? handleUpdate : handleCreate}
                editingCustomer={editingCustomer}
                onCancel={() => setEditingCustomer(null)}
                serverError={serverError}
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
                    {paginatedCustomers.map((c) => (
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

            {totalPages > 1 && (
                <div className="pagination">
                    <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                    >
                    ◀
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        className={currentPage === i + 1 ? "active" : ""}
                        onClick={() => setCurrentPage(i + 1)}
                    >
                        {i + 1}
                    </button>
                    ))}

                    <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                    >
                    ▶
                    </button>
                </div>
            )}


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
