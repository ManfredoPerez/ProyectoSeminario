import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import "./style.css"

import { useEffect, useState } from 'react';


const columns = [
    { 
      field: 'id_dependencia', 
      headerName: 'ID', 
      width: 90 
    },
    {
      field: 'nombre_dependencia',
      headerName: 'Nombre de la dependencia',
      width: 250,
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
  
  

const DependenciaTab = () => {

    const [data, setData] = useState([]);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [isAddUserOpen, setAddUserOpen] = useState(false);
    const [editedNombreDependencia, setEditedNombreDependencia] = useState('');
    const [editingDependenciaId, setEditingDependenciaId] = useState(null);
    const [intervalCount, setIntervalCount] = useState(0);

    const updateData = async () => {
      try {
        const response = await fetch('http://localhost:4000/dependencia');
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
          const response = await fetch('http://localhost:4000/dependencia'); 
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
      

      const handleDeleteClick = (userId) => {
        setSelectedUserId(userId);
        setDialogOpen(true);
      };
    
      const handleViewClick = (id_dependencia) => {
        const dependencia = data.find((item) => item.id_dependencia === id_dependencia);
        console.log("Dependencia: ", dependencia)
        if (dependencia) {
          setEditedNombreDependencia(dependencia.nombre_dependencia);
          setEditingDependenciaId(id_dependencia);
          setAddUserOpen(true); // Abre el formulario de edición
        }
      };

  useEffect(() => {
    fetchData();
  }, []); 

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:4000/dependencia/${selectedUserId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setDialogOpen(false);
        fetchData();
      } else {
        console.error('Error al eliminar el cargo.');
      }
    } catch (error) {
      console.error('Error al eliminar el cargo:', error);
    }
  };

  const handleUpdateDependencia = async (e) => {
    e.preventDefault();
    try {
      // Realiza una solicitud PUT para actualizar la dependencia con los nuevos datos
      const response = await fetch(`http://localhost:4000/dependencia/${editingDependenciaId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre_dependencia: editedNombreDependencia }),
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

  const handleCancelModificar = () => {
    setAddUserOpen(false);
    // window.history.back();
  };

  const handleCancelDelete = () => {
    setDialogOpen(false);
    // window.history.back();
  };

    return(
        <div className='dataTable'>
            <DataGrid
                className='dataGrid'
                rows={data}
                columns={columns.map((column) =>
                  column.field === 'actions'
                    ? {
                        ...column,
                        renderCell: (params) => (
                          <div className='action'>
                            <div className='view'>
                              <img src="/view.svg" alt="" onClick={() => handleViewClick(params.row.id_dependencia)} />
                            </div>
                            <div className='delete' onClick={() => handleDeleteClick(params.row.id_dependencia)}>
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
                checkboxSelection
                disableRowSelectionOnClick
                disableColumnFilter
                disableDensitySelector
                disableColumnSelector
            />
            {isDialogOpen && (
              <div className='confirmation-dialog'>
                    <div className='confirmation-dialog-1'>
                      <p>¿Está seguro de que desea eliminar esta Dependencia?</p>
                      <div className="footer">
                        <button id="cancelBtn" onClick={handleCancelDelete}>Cancelar</button>
                        <button onClick={handleConfirmDelete}>Aceptar</button>
                      </div>
                    </div>
              </div>
            )}


          {isAddUserOpen && (
            <div className='confirmation-dialog'>
              <div className='confirmation-dialog-1'>
                <h4>Editar Dependencia</h4>
                <form onSubmit={handleUpdateDependencia}>
                  <label>Nombre de la Dependencia:</label>
                  <br></br>
                  <input
                    className="form-control"
                    type="text"
                    value={editedNombreDependencia}
                    onChange={(e) => setEditedNombreDependencia(e.target.value)}
                  />
                  <div className="footer">
                    <button id="cancelBtn" onClick={handleCancelModificar}>Cancelar</button>
                    <button type="submit">Editar</button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
    )
}

export default DependenciaTab;