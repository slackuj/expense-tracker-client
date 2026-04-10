import './App.css'
import {AppRoutes} from "./components/AppRoutes.tsx";
import {ToastContainer} from "react-toastify";
import {Navbar} from "./components/NavBar.tsx";

const App = () => {

  return (
      <>
          <Navbar />
          <AppRoutes />
          <ToastContainer position="bottom-right" autoClose={3000} />

      </>
  )
};

export default App
