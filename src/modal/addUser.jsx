import { useEffect, useState } from "react";
import "./style.css";


const AddUser = ({setOpenModal}) => {

  const [userData, setUserData] = useState({
    nombre_usuario: '',
    nombre: '',
    apellido: '',
    contrasena: '',
    codigo: '',
    id_rol: '', 
    id_cargo: '', 
    id_dependencia: '', 
  });

  const [cargos, setCargos] = useState([]);
  const [dependencias, setDependencias] = useState([]);
  const [roles, setRol] = useState([]);
  const [isRolSelectOpen, setIsRolSelectOpen] = useState(false);
  
  useEffect(() => {
    //PARA MOSTRAR LOS CARGOS 
    fetch('http://localhost:4000/cargos')
      .then(response => response.json())
      .then(data => {
        setCargos(data);
      })
      .catch(error => {
        console.error('Error al obtener los cargos', error);
      });

      //PARA MOSTRAR LAS DEPENDENCIAS
      fetch('http://localhost:4000/dependencia')
      .then(response => response.json())
      .then(data => {
        setDependencias(data);
      })
      .catch(error => {
        console.error('Error al obtener las dependencias', error);
      });

      // PARA MOSTRAR LOS ROLES 
      fetch('http://localhost:4000/rol')
      .then(response => response.json())
      .then(data => {
        setRol(data);
      })
      .catch(error => {
        console.error('Error al obtener los roles', error);
      });


  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSelectOpen = () => {
    setIsRolSelectOpen(true);
  };

  const handleSelectClose = () => {
    setIsRolSelectOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {

        setUserData({
          nombre_usuario: '',
          nombre: '',
          apellido: '',
          contrasena: '',
          codigo: '',
          id_rol: '',
          id_cargo: '',
          id_dependencia: '',
        });

        setOpenModal(false);
      } else {
        console.error('Error al agregar usuario');
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
          <h3>Agregar nuevo Usuario</h3>
        </div>
        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
              <label for="exampleInputPassword1">Nombre</label>
              <input 
                type="text" 
                class="form-control" 
                id="nombre"
                name="nombre"
                value={userData.nombre}
                onChange={handleInputChange}
                placeholder="Eje 'Juan'"
              />
          </div>

          <div class="form-row"> 
            <div className="form-group col-md-6">
              <label for="exampleInputPassword1">Usuario</label>
              <input 
                type="text" ç
                class="form-control"
                id="nombre_usuario"
                name="nombre_usuario"
                value={userData.nombre_usuario}
                onChange={handleInputChange}
                placeholder="Eje 'JN1'"
              />
            </div>

            <div className="form-group col-md-6">
              <label for="exampleInputPassword1">Apellido</label>
              <input 
                type="text" 
                class="form-control" 
                id="apellido"
                name="apellido"
                value={userData.apellido}
                onChange={handleInputChange}
                placeholder="Eje 'Ramos'"
                required
              />
            </div>

          </div>
          
          <div className="form-group">
            <label for="exampleInputPassword1">Contraseña</label>
            <input 
              type="password" 
              class="form-control" 
              id="contrasena"
              name="contrasena"
              value={userData.contrasena}
              onChange={handleInputChange}
              placeholder=""
            />
          </div>

          <div className="form-row">

            <div className="form-group col-md-6">
              <label for="exampleInputPassword1">Codigo</label>
              <input 
                type="text" 
                class="form-control" 
                id="codigo"
                name="codigo"
                value={userData.codigo}
                onChange={handleInputChange}
                placeholder="Eje '001'"
              />
            </div>

            <div className="form-group col-md-6">
              <label for="exampleFormControlSelect1">Rol</label>
              <div
                className={`select-wrapper ${
                  isRolSelectOpen ? 'select-open' : ''
                }`}
              >
                <select
                  className="form-control"
                  id="id_rol"
                  name="id_rol"
                  value={userData.id_rol}
                  onClick={handleSelectOpen}
                  onBlur={handleSelectClose}
                  onChange={handleInputChange}
                  placeholder="Eje 'User'"
                >
                  <option value="">Elige un rol</option>
                  {roles.map(rol => (
                    <option key={rol.id_rol} value={rol.id_rol}>
                      {rol.tipo_rol}
                    </option>
                  ))}
                </select>
              </div>
            </div>

          </div>


          <div className="form-row">
            <div class="form-group col-md-6">
              <label for="exampleFormControlSelect1">Cargo</label>
              <select 
                class="form-control" 
                id="id_cargo"
                name="id_cargo"
                value={userData.id_cargo}
                onChange={handleInputChange}
              >
                <option value="">Elige un Cargo</option>
                {cargos.map(cargo => (
                  <option key={cargo.id_cargo} value={cargo.id_cargo}>
                    {cargo.nombre_cargo} 
                  </option>
                ))}
              </select>
            </div>

            <div class="form-group col-md-6">
              <label for="exampleFormControlSelect1">Dependencia</label>
              <select 
                class="form-control" 
                id="id_dependencia"
                name="id_dependencia"
                value={userData.id_dependencia}
                onChange={handleInputChange}
              >
                <option value="">Elige una dependencia</option>
                {dependencias.map(dependencia => (
                  <option key={dependencia.id_dependencia} value={dependencia.id_dependencia}>
                    {dependencia.nombre_dependencia} 
                  </option>
                ))}
              </select>
            </div>

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
            <button type="submit">Continue</button>
        </div>
        </form>
      </div>
    </div>
    )
}

export default AddUser;