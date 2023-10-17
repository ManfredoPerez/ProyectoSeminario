import { useEffect, useState } from "react";
import "./style.css";


const AddCargo = ({setOpenModal, updateCargoData }) => {

  const [dependenia, setDependencia] = useState([]);

  const [userData, setUserData] = useState({
    nombre_cargo: '',
    id_dependencia: '',
  });

  useEffect(() => {
    fetch('http://localhost:4000/dependencia')
    .then(response => response.json())
      .then(data => {
        setDependencia(data);
      })
      .catch(error => {
        console.error('Error al obtener los cargos', error);
      });
  })
  

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
          id_dependencia: '',
        });
        
        
        setOpenModal(false);

        updateCargoData();
      } else {
        console.error('Error al agregar cargo');
      }
    } catch (error) {
      console.error('Error de conexión');
    }
  };


    return (
        <div className="modalBackground">
          <div className="modalContainer" style={{width: "500px", height: "420px"}}>
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
          <br />
        </div>
        <form onSubmit={handleSubmit}>

          {/* DEPENDENCIA  */}
          <div class="form-group">
            <label for="exampleFormControlSelect1">Dependencia</label>
            <select 
              class="form-control" 
              id="id_dependencia"
              name="id_dependencia"
              value={userData.id_dependencia}
              onChange={handleInputChange}
            >
             <option value="">Elige una dependencia</option>
              {dependenia.map(depe => (
                  <option key={depe.id_dependencia} value={depe.id_dependencia}>
                    {depe.nombre_dependencia} 
                  </option>
                ))}
            </select>
          </div>
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