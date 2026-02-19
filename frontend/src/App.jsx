import { Outlet } from "react-router";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/nav/Navbar";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-zinc-900">
        <Navbar />
        <Outlet className="min-h-0 flex-1" />
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
