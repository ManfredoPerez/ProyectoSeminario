import { useState } from "react";
import AddCargo from "../../modal/addCargo";
import CargoTab from "../Tablas/tablaCargo";


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
                {/* {modalOpen && <AddCargo setOpenModal={setModalOpen} />} */}
                {modalOpen && <AddCargo setOpenModal={setModalOpen} updateCargoData={() => {}} />}
        </div>
    </div>
    )
}

export default CargoAdd;