import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import "./style.css"

import { useEffect, useState } from 'react';



const columns = [
    { field: 'id_articulo', headerName: 'ID', width: 90 },
    {
      field: 'nombre',
      headerName: 'Nom Usuario',
      width: 150,
      editable: true,
    },
    {
      field: 'codigo',
      headerName: 'Codigo',
      width: 150,
      editable: true,
    },
    {
      field: 'nombre_articulo',
      headerName: 'Articulo',
      width: 110,
      editable: true,
    },
    
    {
      field: 'no_serie',
      headerName: 'No. Serie',
      width: 110,
      editable: true,
    },
    {
      field: 'valor_unitario',
      headerName: 'Valor',
      width: 110,
      editable: true,
    },
    {
      field: 'valor_total',
      headerName: 'Total',
      width: 110,
      editable: true,
    },
    {
      field: 'valor_baja',
      headerName: 'Valor Baja',
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
  
  

const ArticuloTab = () => {

    const [data, setData] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [isAddUserOpen, setAddUserOpen] = useState(false);
    // const [selectedUserData, setSelectedUserData] = useState(null);
    const [intervalCount, setIntervalCount] = useState(0);

     // VARIABLES PARA MODIFICAR 
    const [editingArticuloId, setEditingArticuloId] = useState(null);
    const [editedResponsable, setEditedResponsabel] = useState('');
    const [editedCodigo, setEditedCodigo] = useState('');
    const [editedNombre, setEditedNombre] = useState('');
    const [editedSerie, setEditedSerie] = useState('');
    const [editedValorU, setEditedValorU] = useState('');
    const [editedValorB, setEditedValorB] = useState('');
    const [editedCantidad, setEditedCantidad] = useState('');
    const [editedObservaciones, setEditedObservaciones] = useState('');

    const updateData = async () => {
      try {
        const response = await fetch('http://localhost:4000/articulos');
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
          const response = await fetch('http://localhost:4000/articulos'); 
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
        fetch('http://localhost:4000/usuarios/')
        .then(response => response.json())
        .then(data => {
            setUsuarios(data);
        })
        .catch(error => {
            console.error('Error al obtener los usuarios', error);
        });

    }, []);


      const handleDeleteClick = (userId) => {
        setSelectedUserId(userId);
        setDialogOpen(true);
      };

      const handleViewClick = (id_articulo) => {
        // setSelectedUserData(id_articulo);
        const usuarios = data.find((item) => item.id_articulo === id_articulo);
        console.log("Dependencia: ", usuarios)
        if (usuarios) {
          setEditedNombre(usuarios.nombre_articulo);
          setEditedResponsabel(usuarios.id_usuario)
          setEditedCodigo(usuarios.codigo)
          setEditedSerie(usuarios.no_serie)
          setEditedCodigo(usuarios.codigo)
          setEditedValorU(usuarios.valor_unitario)
          // setEditedDependencia(usuarios.id_cargo)
          setEditedValorB(usuarios.valor_baja)
          setEditedCantidad(usuarios.cantidad)
          setEditedObservaciones(usuarios.observaciones)
          setEditingArticuloId(id_articulo);
          setAddUserOpen(true); // Abre el formulario de edición
        }
        // setAddUserOpen(true);
      };
    
      const handleConfirmDelete = async () => {
        try {
          // Realiza la eliminación del usuario con el ID selectedUserId
          const response = await fetch(`http://localhost:4000/articulos/${selectedUserId}`, {
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
    
      const handleCancelDelete = () => {
        // Cancela la eliminación y cierra el cuadro de diálogo
        setDialogOpen(false);
        window.history.back();
      };

      const handleCancelModificar = () => {
        setAddUserOpen(false);
      }

      const handleUpdateArticulos = async (e) => {
        e.preventDefault();
        try {
          // Realiza una solicitud PUT para actualizar la dependencia con los nuevos datos
          const response = await fetch(`http://localhost:4000/articulos/${editingArticuloId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              //  nombre_dependencia: editedNombreDependencia,
               id_usuario: editedResponsable,
               codigo: editedCodigo,
               nombre_articulo: editedNombre,
               no_serie: editedSerie,
               valor_unitario: editedValorU,
               valor_baja: editedValorB,
               observaciones: editedObservaciones,
               cantidad: editedCantidad,
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
                              <img src="/view.svg" alt="" onClick={() => handleViewClick(params.row.id_articulo)} />
                            </div>
                            <div className='delete' onClick={() => handleDeleteClick(params.row.id_articulo)}>
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
                        <p>¿Está seguro de que desea eliminar este Articulo?</p>
                        <div className="footer">
                          <button onClick={handleConfirmDelete}>Aceptar</button>
                          <button id="cancelBtn" onClick={handleCancelDelete}>Cancelar</button>
                        </div>
                      </div>
                </div>
              )}



               {isAddUserOpen && (
                  <div className='confirmation-dialog'>
                  <div className='confirmation-dialog-1' style={{ height: "625px"}}>
                    <h4>¿Modificar Articulos?</h4>
                    <form onSubmit={handleUpdateArticulos}>
                    
                      <div className="form-group ">
                          <label for="exampleFormControlSelect1">Responsable </label>
                          {/* <input type="text" value={editedResponsable} /> */}
                          <select 
                              className="form-control" 
                              id="id_usuario"
                              name="id_usuario"
                              value={editedResponsable}
                              onChange={(e) => setEditedResponsabel(e.target.value)}
                          >
                              <option value="">Elige un responsable</option>
                                  {usuarios.map(usuario => (
                                  <option key={usuario.id_usuario} value={usuario.id_usuario}>
                                      {usuario.nombre} {usuario.apellido} {' <----> '} {usuario.nombre_dependencia} { '||' } {usuario.nombre_cargo}
                                  </option>
                              ))}
                          </select>
                      </div>

                      <div className="form-row">
                            <div className="form-group col-md-6">
                                <label for="inputPassword4">Codigo Articulo</label>
                                <input 
                                    type="text" 
                                    id="codigo"
                                    className="form-control" 
                                    name="codigo"
                                    value={editedCodigo}
                                    onChange={(e) => setEditedCodigo(e.target.value)}
                                    // placeholder="Eje '0025'"
                                    />
                            </div>
                        <div className="form-group col-md-6">
                            <label for="inputAddress">Nombre Articulo</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="nombre_articulo"
                                name="nombre_articulo"
                                value={editedNombre}
                                onChange={(e) => setEditedNombre(e.target.value)}
                                // placeholder="Eje 'PC'"
                                />
                        </div>
                      </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label for="inputEmail4">No. serie</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="no_serie"
                                    name="no_serie"
                                    value={editedSerie}
                                    onChange={(e) => setEditedSerie(e.target.value)}
                                    // placeholder="Eje '11478'"
                                    />
                            </div>
                            <div className="form-group col-md-6">
                                <label for="inputPassword4">Valor Unitario</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="valor_unitario"
                                    name="valor_unitario"
                                    value={editedValorU}
                                    onChange={(e) => setEditedValorU(e.target.value)}
                                    // placeholder="Eje '100'"
                                    />
                            </div>
                        </div>


                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label for="inputEmail4">Valor Baja</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="valor_baja"
                                    name="valor_baja"
                                    value={editedValorB}
                                    onChange={(e) => setEditedValorB(e.target.value)}

                                    // placeholder="Eje '10'"
                                    />
                            </div>
                            <div className="form-group col-md-6">
                                <label for="inputPassword4">Cantidad</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="cantidad"
                                    name="cantidad"
                                    value={editedCantidad}
                                    onChange={(e) => setEditedCantidad(e.target.value)}

                                    // placeholder="Eje '5'"
                                    />
                            </div>
                        </div>

                        <div className="form-group">
                            <label for="inputAddress">Observaciones</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="observaciones"
                                name="observaciones"
                                value={editedObservaciones}
                                onChange={(e) => setEditedObservaciones(e.target.value)}

                                // placeholder=""
                                />
                        </div>

                        <div className="footer">
                        <button id="cancelBtn" onClick={handleCancelModificar}>Cancelar</button>
                            <button type="submit" >Continue</button>
                            
                        </div>
                        
                    </form>
                  </div>
                </div>
                )}



                
        </div>
    )
}

export default ArticuloTab;