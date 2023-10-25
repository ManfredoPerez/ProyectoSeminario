import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";

import Login from './scenas/login';
import Navbar from "./scenas/navbar";
import UserAdd from "./scenas/usuarios";
import CargoAdd from "./scenas/cargo";
import DependenciaAdd from "./scenas/dependencias";
import Articulos from "./scenas/articulos";
import HojaServicio from "./scenas/hojaServicico";
import AddArticulo from "./modal/addArticulo";
import AddUser from "./modal/addUser";
import { UserRoleProvider } from "./scenas/login/UserRoleContext";
import { UserIdProvider } from "./scenas/login/UserIdContext";
import Historial from "./scenas/historial";

function PrivateRoute({ element, isLoggedIn }) {
  return isLoggedIn ? element : <Navigate to="/" />;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="app">
      <BrowserRouter>
      <UserRoleProvider>
        <UserIdProvider>
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
          <Routes>
            <Route path="/home/articulos" element={<Articulos />}/>
          </Routes>
          <Routes>
            <Route path="/home/historial" element={<Historial />}/>
          </Routes>
          <Routes>
            <Route path="/home/hojaServicio" element={<HojaServicio />}/>
          </Routes>
          <Routes>
            <Route path="/home/Addarticulo" element={<AddArticulo />}/>
          </Routes>
          <Routes>
            <Route path="/home/AddUser" element={<AddUser />}/>
          </Routes>
          </UserIdProvider>
          </UserRoleProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
