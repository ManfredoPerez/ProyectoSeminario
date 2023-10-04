import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './scenas/login';
import express from 'express';
import morgan from "morgan";

const App = express();

// Settings
App.set("port", 4000);
// Middlewares
App.use(morgan("dev"));

// function App() {
//   return (
//     <div className="app">
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Login />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

export default App;
