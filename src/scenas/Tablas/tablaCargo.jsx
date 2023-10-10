import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import "./style.css"

import { useEffect, useState } from 'react';
import AddCargo from '../../modal/addCargo';


const columns = [
    { field: 'id_cargo', headerName: 'ID', width: 90 },
   {
      field: 'nombre_cargo',
      headerName: 'Nombre del Cargo',
      width: 150,
      editable: true,
    },
    
    
    {
        field: "actions",
        headerName: "Actions",
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
  
  

const CargoTab = () => {

    const [data, setData] = useState([]);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [isAddUserOpen, setAddUserOpen] = useState(false);
    const [selectedUserData, setSelectedUserData] = useState(null);

    const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:4000/cargos'); 
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
  }, []); 

  const handleDeleteClick = (userId) => {
    setSelectedUserId(userId);
    setDialogOpen(true);
  };

  const handleViewClick = (id_cargo) => {
    setSelectedUserData(id_cargo);
    setAddUserOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      // Realiza la eliminación del usuario con el ID selectedUserId
      const response = await fetch(`http://localhost:4000/cargos/${selectedUserId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Si la eliminación se realizó con éxito, cierra el cuadro de diálogo
        setDialogOpen(false);
        // Actualiza la tabla volviendo a cargar los datos
        fetchData();
      } else {
        // Manejar errores si la eliminación no fue exitosa
        console.error('Error al eliminar el cargo.');
        // Puedes mostrar un mensaje de error al usuario si lo deseas
      }
    } catch (error) {
      console.error('Error al eliminar el cargo:', error);
    }
  };

  const handleCancelDelete = () => {
    // Cancela la eliminación y cierra el cuadro de diálogo
    setDialogOpen(false);
    window.history.back();
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
                              <img src="/view.svg" alt="" onClick={() => handleViewClick(params.row)} />
                            </div>
                            <div className='delete' onClick={() => handleDeleteClick(params.row.id_cargo)}>
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
                  <AddCargo
                    setOpenModal={setAddUserOpen}
                    userData={selectedUserData}
                  />
                )}

                
        </div>
    )
}

export default CargoTab;