import { useState } from "react";
import "./style.css";


const AddCargo = ({setOpenModal}) => {

  const [userData, setUserData] = useState({
    nombre_cargo: '',
   
  });

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/cargos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {

        setUserData({
          nombre_cargo: '',
        });
        
        setOpenModal(false);
      } else {
        console.error('Error al agregar cargo');
      }
    } catch (error) {
      console.error('Error de conexión');
    }
  };


    return (
        <div className="modalBackground">
          <div className="modalContainer">
            <div className="titleCloseBtn">
              <button
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                X
              </button>
            </div>
          <div className="title">
          <h3>Agregar Nuevo Cargo</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-2">
            <label for="exampleInputPassword1">Nombre del Cargo</label>
            <input 
              type="text" 
              class="form-control" 
              id="nombre_cargo"
              name="nombre_cargo"
              value={userData.nombre}
              onChange={handleInputChange}
              placeholder="Ingrese Cargo"
            />
          </div>

      

        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button>Continue</button>
        </div>
        </form>
      </div>
    </div>
    )
}

export default AddCargo;