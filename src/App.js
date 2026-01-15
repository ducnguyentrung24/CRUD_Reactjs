import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomerPage from "./pages/CustomerPage";

function App() {
  return (
    <>
      <CustomerPage />
      <ToastContainer position="bottom-right" autoClose={2500} />
    </>
  );
}

export default App;
