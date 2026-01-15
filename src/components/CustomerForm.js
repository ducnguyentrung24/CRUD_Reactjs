import { useEffect, useState } from "react";
import { validateCustomer, isValidEmail } from "../utils/customerValidate";

function CustomerForm({ onSubmit, editingCustomer, onCancel, serverError }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});

    useEffect(() => {
        if (editingCustomer) {
            setName(editingCustomer.name);
            setEmail(editingCustomer.email);
            setPhone(editingCustomer.phone);
            setAddress(editingCustomer.address || "");
            setErrors({});
        }
    }, [editingCustomer]);

    const handleSubmit = (e) => {
        e.preventDefault();

    const formData = { name, email, phone, address };
    const validateErrors = validateCustomer(formData);

    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors);
      return;
    }

    setErrors({});
    onSubmit(formData);
  };


  return (
    <form onSubmit={handleSubmit}>
      <h3>{editingCustomer ? "Sửa Customer" : "Thêm Customer"}</h3>

      <input
        placeholder="Tên"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          if (errors.name) setErrors({ ...errors, name: null });
        }}
      />
      {errors.name && <p className="error-text">{errors.name}</p>}

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => {
          const value = e.target.value;
          setEmail(value);

          if (!value) {
            setErrors({ ...errors, email: "Email không được để trống" });
          } else if (!isValidEmail(value)) {
            setErrors({ ...errors, email: "Email không đúng định dạng" });
          } else {
            setErrors({ ...errors, email: null });
          }
        }}
      />
      {errors.email && <p className="error-text">{errors.email}</p>}
      {serverError?.field === "email" && (
        <p className="error-text">{serverError.message}</p>
      )}

      <input
        placeholder="Số điện thoại"
        value={phone}
        onChange={(e) => {
          setPhone(e.target.value);
          if (errors.phone) setErrors({ ...errors, phone: null });
        }}
      />
      {errors.phone && <p className="error-text">{errors.phone}</p>}
      {serverError?.field === "phone" && (
        <p className="error-text">{serverError.message}</p>
      )}

      <input
        placeholder="Địa chỉ"
        value={address}
        onChange={(e) => {
          setAddress(e.target.value);
          if (errors.address) setErrors({ ...errors, address: null });
        }}
      />
      {errors.address && <p className="error-text">{errors.address}</p>}

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
