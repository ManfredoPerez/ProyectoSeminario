// import React from 'react';
// import ReactDOM from 'react-dom';
//import './index.css';
import app from './App';


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
const main =()=>{
  app.listen(app.get("port"));
    console.log(`Server on port ${app.get("port")}`);
};
main();


