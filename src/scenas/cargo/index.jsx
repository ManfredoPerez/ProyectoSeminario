import { useState } from "react";
import CargoTab from "../Tablas/tablaCargo";
import "./style.css"
import AddCargo from "../../modal/addCargo";

const CargoAdd = () =>{

    const [modalOpen, setModalOpen] = useState(false);

    return(
        <div >
            <div className="users">
                <div className="info">
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <h1>Cargos</h1>
                    <button
                        className="btnAdd"
                        onClick={() => {
                            setModalOpen(true);
                        }}
                    >Agregar Cargo</button>
                </div>
                    <CargoTab slug="users"/>
                    {modalOpen && <AddCargo setOpenModal={setModalOpen} />}
            </div>
        </div>
    )
}

export default CargoAdd;