import { useEffect, useState } from "react";

function CustomerForm({ onSubmit, editingCustomer, onCancel }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (editingCustomer) {
      setName(editingCustomer.name);
      setEmail(editingCustomer.email);
      setPhone(editingCustomer.phone);
      setAddress(editingCustomer.address || "");
    }
  }, [editingCustomer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !address) return;

    onSubmit({ name, email, phone, address });

    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{editingCustomer ? "Sửa Customer" : "Thêm Customer"}</h3>

      <input
        type="text"
        placeholder="Tên"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="text"
        placeholder="Số điện thoại"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <input
        type="text"
        placeholder="Địa chỉ"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <div className="form-actions">
        {editingCustomer && (
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Hủy
          </button>
        )}
        <button
          type="submit"
          className={editingCustomer ? "btn-primary" : "btn-success"}
        >
          {editingCustomer ? "Cập nhật" : "Thêm"}
        </button>
      </div>
    </form>
  );
}

export default CustomerForm;
