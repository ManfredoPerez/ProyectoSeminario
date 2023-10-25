import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import "./style.css"

import { useEffect, useState } from 'react';
// import AddUser from '../../modal/addUser';


const columns = [
    { field: 'id_usuario', headerName: 'ID', width: 90 },
    {
      field: 'nombre_usuario',
      headerName: 'Usuario',
      width: 150,
      editable: true,
    },
    {
      field: 'nombre',
      headerName: 'Nombre',
      width: 150,
      editable: true,
    },
    {
      field: 'apellido',
      headerName: 'Apellido',
      width: 110,
      editable: true,
    },
    
    {
      field: 'codigo',
      headerName: 'Codigo',
      width: 110,
      editable: true,
    },
    {
      field: 'tipo_rol',
      headerName: 'Rol',
      width: 110,
      editable: true,
    },
    {
      field: 'nombre_dependencia',
      headerName: 'Dependencia',
      width: 110,
      editable: true,
      
    },
    {
      field: 'nombre_cargo',
      headerName: 'Cargo',
      width: 110,
      editable: true,
    },
    
    {
        field: "actions",
        headerName: "Acciones",
        width: 100,
        renderCell: (params) => {
            return <div className='action'>
                <div className="view">
                    <img src="/view.svg" alt="" />
                </div>
                <div className="delete">
                  <img src="/delete.svg" alt="" />
                </div>
            </div>
        }
    },
  ];
  
  

const UsuarioTab = () => {

    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);

    const [cargos, setCargos] = useState([]);
    // const [dependencias, setDependencias] = useState([]);
    const [roles, setRol] = useState([]);

    const [isDialogOpen, setDialogOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [isAddUserOpen, setAddUserOpen] = useState(false);
    // const [selectedUserData, setSelectedUserData] = useState(null);
    const [intervalCount, setIntervalCount] = useState(0);

    // VARIABLES PARA MODIFICAR 
    const [editingNombreId, setEditingNombreId] = useState(null);
    const [editedNombre, setEditedNombre] = useState('');
    const [editedApellido, setEditedApellido] = useState('');
    const [editedUsuario, setEditedUsuario] = useState('');
    const [editedContrasena, setEditedContrasena] = useState('');
    const [editedCodigo, setEditedCodigo] = useState('');
    const [editedRol, setEditedRol] = useState('');
    // const [editedDependencia, setEditedDependencia] = useState('');
    const [editedCargo, setEditedCargo] = useState('');

    const updateData = async () => {
      try {
        const response = await fetch('http://localhost:4000/usuarios');
        if (!response.ok) {
          throw new Error('Error al obtener datos de la API');
        }
        const data = await response.json();
  
        const dataWithIds = data.map((item, index) => ({ ...item, id: index }));
        setData(dataWithIds);
      } catch (error) {
        console.error('Error al obtener datos de la API:', error);
      }
    };

    const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:4000/usuarios'); 
          if (!response.ok) {
            throw new Error('Error al obtener datos de la API');
          }
          const data = await response.json();
      
          // Agrega un id único a cada fila basado en el índice
          const dataWithIds = data.map((item, index) => ({ ...item, id: index }));
      
          setData(dataWithIds); // Actualiza el estado con los datos que tienen identificadores únicos
        } catch (error) {
          console.error('Error al obtener datos de la API:', error);
        }
      };

      const fetchData1 = async () => {
        try {
          const response = await fetch('http://localhost:4000/usuarios/user'); 
          if (!response.ok) {
            throw new Error('Error al obtener datos de la API');
          }
          const data = await response.json();
      
          // Agrega un id único a cada fila basado en el índice
          const dataWithIds = data.map((item, index) => ({ ...item, id: index }));
      
          setData1(dataWithIds); // Actualiza el estado con los datos que tienen identificadores únicos
        } catch (error) {
          console.error('Error al obtener datos de la API:', error);
        }
      };

      useEffect(() => {
        fetchData();
        const intervalId = setInterval(() => {
            updateData();
            // Incrementa el contador del intervalo
            setIntervalCount(intervalCount + 1);
          }, 5000); // Actualiza cada 5 segundos (ajusta el valor según tus necesidades)
      
          // Limpia el intervalo al desmontar el componente
          return () => clearInterval(intervalId);
      }, [intervalCount]);
      

      useEffect(() => {
        fetchData();
      }, []); 

      useEffect(() => {
        fetchData1();
      }, []); 


      // PARA VER EL CARGO LA DEPENDENCIA Y EL ROL
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

      const handleDeleteClick = (userId) => {
        setSelectedUserId(userId);
        setDialogOpen(true);
      };

      const handleViewClick = (id_usuario) => {
        const usuarios = data1.find((item) => item.id_usuario === id_usuario);
        console.log("Dependencia: ", usuarios)
        if (usuarios) {
          setEditedNombre(usuarios.nombre);
          setEditingNombreId(id_usuario);
          setEditedApellido(usuarios.apellido)
          setEditedUsuario(usuarios.nombre_usuario)
          setEditedContrasena(usuarios.contrasena)
          setEditedCodigo(usuarios.codigo)
          setEditedRol(usuarios.id_rol)
          // setEditedDependencia(usuarios.id_cargo)
          setEditedCargo(usuarios.id_cargo)
          setAddUserOpen(true); // Abre el formulario de edición
        }
      };
    
      const handleConfirmDelete = async () => {
        try {
          // Realiza la eliminación del usuario con el ID selectedUserId
          const response = await fetch(`http://localhost:4000/usuarios/${selectedUserId}`, {
            method: 'DELETE',
          });
    
          if (response.ok) {
            // Si la eliminación se realizó con éxito, cierra el cuadro de diálogo
            setDialogOpen(false);
            // Actualiza la tabla volviendo a cargar los datos
            fetchData();
          } else {
            // Manejar errores si la eliminación no fue exitosa
            console.error('Error al eliminar el usuario.');
            // Puedes mostrar un mensaje de error al usuario si lo deseas
          }
        } catch (error) {
          console.error('Error al eliminar el usuario:', error);
        }
      };

      const handleCancelModificar = () => {
        setAddUserOpen(false);
        // window.history.back();
      };
    
      const handleCancelDelete = () => {
        // Cancela la eliminación y cierra el cuadro de diálogo
        setDialogOpen(false);
        window.history.back();
      };

      const handleUpdateUsuario = async (e) => {
        e.preventDefault();
        try {
          // Realiza una solicitud PUT para actualizar la dependencia con los nuevos datos
          const response = await fetch(`http://localhost:4000/usuarios/${editingNombreId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              //  nombre_dependencia: editedNombreDependencia,
               nombre_usuario: editedUsuario,
               nombre: editedNombre,
               apellido: editedApellido,
               contrasena: editedContrasena,
               codigo: editedCodigo,
               id_rol: editedRol,
               id_cargo: editedCargo,
              }),
          });
      
          if (response.ok) {
            setAddUserOpen(false); // Cierra el formulario de edición
            fetchData(); // Actualiza la lista de dependencias
          } else {
            console.error('Error al actualizar la dependencia.');
          }
        } catch (error) {
          console.error('Error al actualizar la dependencia:', error);
        }
      };

    return(
        <div className='dataTable'>
            <DataGrid
                className='dataGrid'
                rows={data}
                // columns={columns}
                columns={columns.map((column) =>
                  column.field === 'actions'
                    ? {
                        ...column,
                        renderCell: (params) => (
                          <div className='action'>
                            <div className='view'>
                              <img src="/view.svg" alt="" onClick={() => handleViewClick(params.row.id_usuario)} />
                            </div>
                            <div className='delete' onClick={() => handleDeleteClick(params.row.id_usuario)}>
                              <img src='/delete.svg' alt='' />
                            </div>
                          </div>
                        ),
                      }
                    : column
                )}
                initialState={{
                pagination: {
                    paginationModel: {
                    pageSize: 5,
                    },
                },
                }}
                slots={{toolbar: GridToolbar}}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                    }
                }}
                pageSizeOptions={[5]}
                // checkboxSelection
                disableRowSelectionOnClick
                disableColumnFilter
                disableDensitySelector
                disableColumnSelector
            />

             {/* Cuadro de diálogo de confirmación */}
              {isDialogOpen && (
                <div className='confirmation-dialog'>
                      <div className='confirmation-dialog-1'>
                        <p>¿Está seguro de que desea eliminar este usuario?</p>
                        <div className="footer">
                          <button onClick={handleConfirmDelete}>Aceptar</button>
                          <button id="cancelBtn" onClick={handleCancelDelete}>Cancelar</button>
                        </div>
                      </div>
                </div>
              )}

 
               {isAddUserOpen && (
                  <div className="confirmation-dialog">
                    <div className="confirmation-dialog-1" style={{ height: "625px"}}>
                      <h4>Editar Usuario</h4>
                      <form onSubmit={handleUpdateUsuario}>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Nombre</label>
                            <input 
                              type="text" 
                              class="form-control" 
                              // id="nombre"
                              // name="nombre"
                              value={editedNombre}
                              onChange={(e) => setEditedNombre(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label for="exampleInputPassword1">Apellido</label>
                            <input 
                              type="text" 
                              class="form-control" 
                              id="apellido"
                              name="apellido"
                              value={editedApellido}
                              onChange={(e) => setEditedApellido(e.target.value)}
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
                              value={editedUsuario}
                              onChange={(e) => setEditedUsuario(e.target.value)}
                            />
                          </div>

                          <div className="form-group col-md-6">
                            <label for="exampleInputPassword1">Contraseña</label>
                            <input 
                              type="password" 
                              class="form-control" 
                              id="contrasena"
                              name="contrasena"
                              value={editedContrasena}
                              onChange={(e) => setEditedContrasena(e.target.value)}
                            />
                          </div>

                        </div>
                        

                        <div className="form-row">

                          <div className="form-group col-md-6">
                            <label for="exampleInputPassword1">Codigo</label>
                            <input 
                              type="text" 
                              class="form-control" 
                              id="codigo"
                              name="codigo"
                              value={editedCodigo}
                              onChange={(e) => setEditedCodigo(e.target.value)}
                            />
                          </div>
                          
                          <div className="form-group col-md-6">
                            <label for="exampleFormControlSelect1">Rol</label>

                              <select
                                className="form-control"
                                // id="id_rol"
                                // name="id_rol"
                                value={editedRol}
                                onChange={(e) => setEditedRol(e.target.value)}
                              >
                                {/* <option value={editedRol}></option> */}
                                {roles.map(rol => (
                                  <option key={rol.id_rol} value={rol.id_rol}>
                                    {rol.tipo_rol}
                                  </option>
                                ))}
                              </select>
                          </div>

                        </div>


                        <div className="form-row">
                          

                          <div class="form-group col-md-6">
                            <label for="exampleFormControlSelect1">Cargo</label>
                            <select 
                              class="form-control" 
                              id="id_cargo"
                              name="id_cargo"
                              value={editedCargo}
                              onChange={(e) => setEditedCargo(e.target.value)}
                              
                            >
                              {cargos.map(cargo => (
                                <option key={cargo.id_cargo} value={cargo.id_cargo}>
                                  {cargo.nombre_dependencia} {cargo.nombre_cargo} 
                                </option>
                              ))}
                              
                            </select>
                          </div>
                        </div>

                      <div className="footer">
                      <button id="cancelBtn" onClick={handleCancelModificar}>Cancelar</button>
                          <button type="submit">Continue</button>
                      </div>
                      </form>
                    </div>
                  </div>
                )}

                
        </div>
    )
}

export default UsuarioTab;