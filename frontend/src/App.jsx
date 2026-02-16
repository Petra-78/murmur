import { Outlet } from "react-router";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/nav/Navbar";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <div className="flex flex-col h-screen overflow-hidden">
        <Navbar />
        <Outlet className="flex-1 min-h-0 overflow-hidden" />
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </>
  );
}

export default App;
