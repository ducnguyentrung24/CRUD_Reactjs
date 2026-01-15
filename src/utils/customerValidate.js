// Regex email
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Validate form customer
export const validateCustomer = ({ name, email, phone, address }) => {
  const errors = {};

  if (!name || name.trim() === "") {
    errors.name = "Tên không được để trống";
  }

  if (!email || email.trim() === "") {
    errors.email = "Email không được để trống";
  } else if (!isValidEmail(email)) {
    errors.email = "Email không đúng định dạng";
  }

  if (!phone || phone.trim() === "") {
    errors.phone = "Số điện thoại không được để trống";
  }

  if (!address || address.trim() === "") {
    errors.address = "Địa chỉ không được để trống";
  }

  return errors;
};
