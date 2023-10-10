import { useState } from "react";
import DependenciaTab from "../Tablas/tablaDependencias";
import "./style.css"
import AddDependencia from "../../modal/addDependencia.jsx";



const DependenciaAdd = () =>{
    const [modalOpen, setModalOpen] = useState(false);


    return(
        <div >
        <div className="dependencia">
            <div className="info">
                <br />
                <br />
                <br />
                <br />
                <br />
                <h1>Dependencias</h1>
                <button
                    className="btnAdd"
                    onClick={() => {
                        setModalOpen(true);
                    }}
                >Agregar Dependencia</button>
            </div>
            <DependenciaTab slug="dependencia"/>
                    {modalOpen && <AddDependencia setOpenModal={setModalOpen} />}          
        </div>
    </div>
    )
}

export default DependenciaAdd;