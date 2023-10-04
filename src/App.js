import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './scenas/login';
import Navbar from "./scenas/navbar";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
          <Routes>
            <Route path="/home" element={<Navbar />}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
