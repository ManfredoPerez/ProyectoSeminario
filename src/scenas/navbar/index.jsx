import "./style.css";
import xelaImage from "../login/logoMuni.png"
import UserAdd from "../usuarios";
import { useState } from "react";
import CargoAdd from "../cargo";
import DependenciaAdd from "../dependencias";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Bienvenida from "../bienvenida/binevenida";
import Articulos from "../articulos";
import HojaServicio from "../hojaServicico";
import { useUserRole } from "../login/UserRoleContext";
import ArticuloUsuario from "../articulosUsuario";
import QR from "../QR";
import QRUsuario from "../QRUsuario";
import Historial from "../historial";

const Navbar = () => {
    const { userRole } = useUserRole();

    const [showUserAdd, setShowUserAdd] = useState(false);
    const [showCargoAdd, setShowCargoAdd] = useState(false);
    const [showDependenciaAdd, setShowDependenciaAdd] = useState(false);
    const [showBienvenida, setShowBienvenida] = useState(true);
    const [showArticulosAdd, setShowArticulos] = useState(false);
    const [showReporteAdd, setShowReporte ] = useState(false);
    const [showHojaAdd, setShowHoja] = useState(false);
    const [showArtuloUsuario, setShowArtuculoUser] = useState(false);
    const [showQR, setShowQr] = useState(false);
    const [showQRUsuario, setShowQrUsuario] = useState(false);

    const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');
    const navigate = useNavigate();

    const handleCargoClick = () => {
        setShowCargoAdd(true);
        setShowUserAdd(false);
        setShowDependenciaAdd(false);
        setShowBienvenida(false);
        setShowHoja(false);
        setShowReporte(false);
        setShowArticulos(false);
        setShowArtuculoUser(false);
        setShowQr(false);
        setShowQrUsuario(false);
    };

    const handleDependenciaClick = () => {
        setShowDependenciaAdd(true);
        setShowCargoAdd(false);
        setShowUserAdd(false);
        setShowHoja(false);
        setShowBienvenida(false); 
        setShowReporte(false);
        setShowArticulos(false);
        setShowArtuculoUser(false);
        setShowQr(false);
        setShowQrUsuario(false);
    };

    const handleUserClick = () => {
        setShowUserAdd(true);
        setShowCargoAdd(false);
        setShowDependenciaAdd(false);
        setShowBienvenida(false);
        setShowHoja(false);
        setShowReporte(false);
        setShowArticulos(false);
        setShowArtuculoUser(false);
        setShowQr(false);
        setShowQrUsuario(false);
    };
    
    const handerArticulosClick = () => {
        setShowArticulos(true);
        setShowBienvenida(false);
        setShowCargoAdd(false);
        setShowUserAdd(false);
        setShowDependenciaAdd(false);
        setShowReporte(false);
        setShowHoja(false);
        setShowArtuculoUser(false);
        setShowQr(false);
        setShowQrUsuario(false);
    }

    const handerBienvenidaClick = () => {
        setShowBienvenida(true);
        setShowCargoAdd(false);
        setShowUserAdd(false);
        setShowDependenciaAdd(false);
        setShowHoja(false);
        setShowReporte(false);
        setShowArticulos(false);
        setShowArtuculoUser(false);
        setShowQr(false);
        setShowQrUsuario(false);
    }
    

    const handerReporteClick = () => {
        setShowReporte(true);
        setShowArticulos(false);
        setShowBienvenida(false);
        setShowCargoAdd(false);
        setShowUserAdd(false);
        setShowDependenciaAdd(false);
        setShowHoja(false);
        setShowArtuculoUser(false);
        setShowQr(false);
        setShowQrUsuario(false);
    }

    const handerHojaClick = () => {
        setShowHoja(true);
        setShowReporte(false);
        setShowArticulos(false);
        setShowBienvenida(false);
        setShowCargoAdd(false);
        setShowUserAdd(false);
        setShowDependenciaAdd(false);
        setShowArtuculoUser(false);
        setShowQr(false);
        setShowQrUsuario(false);
    }

    
    const handerArticuloUsuario = () => {
        setShowArtuculoUser(true);
        setShowHoja(false);
        setShowReporte(false);
        setShowArticulos(false);
        setShowBienvenida(false);
        setShowCargoAdd(false);
        setShowUserAdd(false);
        setShowDependenciaAdd(false);
        setShowQr(false);
        setShowQrUsuario(false);
    }

    const handerQR = () => {
        setShowQr(true);
        setShowArtuculoUser(false);
        setShowHoja(false);
        setShowReporte(false);
        setShowArticulos(false);
        setShowBienvenida(false);
        setShowCargoAdd(false);
        setShowUserAdd(false);
        setShowDependenciaAdd(false);
        setShowQrUsuario(false);
    }

    const handerQRUsuario = () => {
        setShowQrUsuario(true);
        setShowArtuculoUser(false);
        setShowHoja(false);
        setShowReporte(false);
        setShowArticulos(false);
        setShowBienvenida(false);
        setShowCargoAdd(false);
        setShowUserAdd(false);
        setShowDependenciaAdd(false);
    }

    const handleLogout = () => {
        navigate('/');
        toast.success('Sesión cerrada exitosamente');
      };

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
            <a href className="brand" style={{cursor: "pointer"}} onClick={handerBienvenidaClick}>
                <i className="bx bxs-smile"></i>
                <span className="text">Municipalidad</span>
            </a>
            <ul className="side-menu top">
            {userRole === 'administrador' && (
                <>
                    <li className="active">
                        <a href="#dependencia" onClick={handleDependenciaClick}>
                            <i className="bx bxs-user"></i>
                            <span className="text">Agregar Dependencia</span>
                        </a>
                        
                    </li>
                
                    <li>
                        <a  href="#cargo" onClick={handleCargoClick}>
                            <i className="bx bxs-user"></i>
                            <span className="text">Agregar Cargo</span>
                        </a>
                    </li>


                    <li>
                        <a href="#usuario" onClick={handleUserClick}>
                            <i className="bx bxs-dashboard"></i>
                            <span className="text">Agregar Usuario</span>
                        </a>
                    </li>



                    <li>
                        <a href="#articulos" onClick={handerArticulosClick}>
                            <i className='bx bxs-folder'></i>
                            <span className="text">Agregar Articulos</span>
                        </a>
                    </li>

                    <li>
                        <a href="#servicio" onClick={handerHojaClick}>
                            <i className='bx bxs-spreadsheet'></i>
                            <span className="text">Crear Hoja de Servicio</span>
                        </a>
                    </li>

                    <li>
                        <a href="#reporte" onClick={handerReporteClick}>
                            <i className='bx bxs-report'></i>
                            <span className="text">Historial</span>
                        </a>
                    </li>
                </>
                )}
                {userRole === 'usuario' && (
                    <>
                        <li className="active">
                            <a href="#servicio" onClick={handerArticuloUsuario}>
                                <i className='bx bxs-spreadsheet'></i>
                                <span className="text">Ver Tus Articulos</span>
                            </a>
                        </li>

                        {/* <li>
                            <a href="#reporte" onClick={handerReporteClick}>
                                <i className='bx bxs-report'></i>
                                <span className="text">Tus Reportes</span>
                            </a>
                        </li> */}
                    </>
                )}
            </ul>

            <ul className="side-menu">
                {userRole === 'administrador' && (
                    <>
                    <li> 
                        <a href="#QR" onClick={handerQR}>
                            <i className='bx bx-qr-scan'></i>
                            <span className="text">QR</span>
                        </a>
                    </li>
                    </>
                    )}
                    {userRole === 'usuario' && (
                        <>
                        <li> 
                            <a href="#QR" onClick={handerQRUsuario}>
                                <i className='bx bx-qr-scan'></i>
                                <span className="text">QR</span>
                            </a>
                        </li>
                        </>
                    )}
                <li>
                    <a href className="logout" onClick={handleLogout}>
                        <i className="bx bxs-log-out-circle"></i>
                        <span className="text">Salir</span>
                    </a>
                </li>
            </ul>
        </section>


        
        <section id="content">
            <nav>
                <i className='bx bx-menu' onClick={handleMenuToggle}></i>
                <a href className="profile">
                    <img src={xelaImage} alt="" />
                </a>
                <a href style={{cursor: "pointer"}} onClick={handerBienvenidaClick} className="nav-link"> <h4> <b>Tarjeta de Responsabilidad</b> </h4> </a>
                <form action="#">
                </form>

                <input type="checkbox" id="switch-mode" hidden/>
			    <label for="switch-mode" class="switch-mode"></label>

                <a href className="profile">
                    <img src={xelaImage} alt="" />
                </a>
            </nav>

            <main>
                {showBienvenida && <Bienvenida />}
                {showUserAdd && <UserAdd />}
                {showCargoAdd && <CargoAdd />}
                {showDependenciaAdd && <DependenciaAdd />}
                {showArticulosAdd && <Articulos/> }
                {showReporteAdd && <Historial />}
                {showHojaAdd && <HojaServicio/> }
                {showArtuloUsuario && <ArticuloUsuario/>}
                {showQR && <QR/>}
                {showQRUsuario && <QRUsuario/>}
            </main>
        </section>
        </div>
    )
}

export default Navbar;