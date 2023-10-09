import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './scenas/login';
import Navbar from "./scenas/navbar";
import UserAdd from "./scenas/usuarios";
import CargoAdd from "./scenas/cargo";
import DependenciaAdd from "./scenas/dependencias";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
          <Routes>
            <Route path="/home" element={<Navbar />}/>
          </Routes>
          <Routes>
            <Route path="/home/user" element={<UserAdd />}/>
          </Routes>
          <Routes>
            <Route path="/home/cargo" element={<CargoAdd />}/>
          </Routes>
          <Routes>
            <Route path="/home/dependencia" element={<DependenciaAdd />}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
