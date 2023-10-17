import {  useState } from "react";
import "./style.css";

const AddDependencia = ({setOpenModal}) => {

  const [dependenciaData, setDependenciaData] = useState({
    nombre_dependencia: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDependenciaData({ ...dependenciaData, [name]: value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/dependencia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dependenciaData),
      });

      if (response.ok) {
        // Aquí puedes realizar acciones después de agregar el usuario.
        // Por ejemplo, limpiar los campos de entrada.
        setDependenciaData({
          nombre_dependencia: '',
          });

        // Cierra el modal u realiza otras acciones necesarias.
        setOpenModal(false);
      } else {
        // Maneja errores de la API aquí si es necesario.
        console.error('Error al agregar usuario');
      }
    } catch (error) {
      // Maneja errores de red o del servidor aquí si es necesario.
      console.error('Error de conexión');
    }
  };
    return (
        <div className="modalBackground">
          <div className="modalContainer" style={{width: "500px", height: "350px"}}>
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
          <h3>Agregar nueva Dependencia</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-2">
            <label for="exampleInputPassword1">Nombre de la dependencia</label>
            <input 
            type="text"
            class="form-control"
            id="nombre_dependencia"
            name="nombre_dependencia"
            value={dependenciaData.nombre_dependencia}
            onChange={handleInputChange} />
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
          <button type="submit"> Continue</button>
        </div>
        
        </form>
      </div>
    </div>
    )
}

export default AddDependencia;