import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";

import Login from './scenas/login';
import Navbar from "./scenas/navbar";
import UserAdd from "./scenas/usuarios";
import CargoAdd from "./scenas/cargo";
import DependenciaAdd from "./scenas/dependencias";

function PrivateRoute({ element, isLoggedIn }) {
  return isLoggedIn ? element : <Navigate to="/" />;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="app">
      <BrowserRouter>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />}  />
            <Route
            path="/home"
            element={<PrivateRoute isLoggedIn={isLoggedIn} />}
          />
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
