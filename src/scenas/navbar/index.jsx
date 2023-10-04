import "./style.css";
import xelaImage from "../login/logoMuni.png"
import UserAdd from "../usuarios";
import { useState } from "react";

const Navbar = () => {
    const [showUserAdd, setShowUserAdd] = useState(false);
    const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');
    
    allSideMenu.forEach(item=> {
        const li = item.parentElement;
    
        item.addEventListener('click', function () {
            allSideMenu.forEach(i=> {
                i.parentElement.classList.remove('active');
            })
            li.classList.add('active');

            
        })
    });
    

    const handleMenuToggle = () => {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('hide');
      };
    
    return (
        <div>
        
        <section id="sidebar">
            <a href="/home" className="brand">
                <i className="bx bxs-smile"></i>
                <span className="text">Municipalidad</span>
            </a>
            <ul className="side-menu top">
                <li className="active">
                    <a  href="#usuario" onClick={() => setShowUserAdd(true)}>
                        <i className="bx bxs-user"></i>
                        <span className="text">Agregar Usuario</span>
                    </a>
                </li>

                <li>
                    <a href="#cargo" onClick={() => setShowUserAdd(true)}>
                        <i className="bx bxs-user"></i>
                        <span className="text">Agregar cargo</span>
                    </a>
                </li>


                <li>
                    <a href="#rol" onClick={() => setShowUserAdd(true)}>
                        <i className="bx bxs-dashboard"></i>
                        <span className="text">Agregar rol</span>
                    </a>
                </li>

                <li>
                    <a href="#producto">
                        <i className='bx bxs-folder'></i>
                        <span className="text">Agregar producto</span>
                    </a>
                </li>

                <li>
                    <a href="#servicio">
                        <i className='bx bxs-spreadsheet'></i>
                        <span className="text">Crear Hoja de Servicio</span>
                    </a>
                </li>

                <li>
                    <a href="#reporte">
                        <i className='bx bxs-report'></i>
                        <span className="text">Reporte</span>
                    </a>
                </li>
            </ul>

            <ul className="side-menu">
                <li>
                    <a href=".">
                        <i className='bx bx-qr-scan'></i>
                        <span className="text">QR</span>
                    </a>
                </li>

                <li>
                    <a href="." className="logout">
                        <i className="bx bxs-log-out-circle"></i>
                        <span className="text">Salir</span>
                    </a>
                </li>
            </ul>
        </section>


        
        <section id="content">
            <nav>
                <i className='bx bx-menu' onClick={handleMenuToggle}></i>
                <a href="/home" className="profile">
                    <img src={xelaImage} alt="" />
                </a>
                <a href="/home" className="nav-link"> <h4> <b>Tarjeta de Responsabilidad</b> </h4> </a>
                <form action="#">
                    <div className="form-input">
                        <input type="search" placeholder="Buscar..."/>
                        <button type="submit" className="search-btn"><i className='bx bx-search-alt' ></i></button>
                    </div>
                </form>

                <input type="checkbox" id="switch-mode" hidden/>
			    <label for="switch-mode" class="switch-mode"></label>

                <a href="." className="profile">
                    <img src={xelaImage} alt="" />
                </a>
            </nav>

            <main>
                {showUserAdd && <UserAdd />}
                {/* <div className="head-title">
                    <div className="left">
                        <h1>Dashboard</h1>
                    </div>
                </div> */}
            </main>
        </section>
        </div>
    )
}

export default Navbar;