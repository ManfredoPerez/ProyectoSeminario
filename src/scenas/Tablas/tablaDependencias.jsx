import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import "./style.css"

import { useEffect, useState } from 'react';


const columns = [
    { field: 'id_dependencia', headerName: 'ID', width: 90 },
    // {
    //     field: "avatar", headerName: "Avatar", width:100,
    //     renderCell: (params)=> {
    //         return <img src={params.row.img || "/logoMuni.png"} alt='' />
    //     },
    // },
    {
      field: 'nombre_dependencia',
      headerName: 'Nombre de la dependencia',
      width: 250,
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
  
  

const DependenciaTab = () => {

    const [data, setData] = useState([]);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [isAddUserOpen, setAddUserOpen] = useState(false);
    // const [ setAddUserOpen] = useState(false);
    const [selectedUserData, setSelectedUserData] = useState(null);
    // const [setSelectedUserData] = useState(null);
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
        setSelectedUserData(id_dependencia);
        setAddUserOpen(true);
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
                <p>¿Está seguro de que desea eliminar esta Dependencia?</p>
                  <h1>Usuario: {setData.nombre_dependencia} </h1>
                <div className="footer">
                  <button id="cancelBtn" onClick={handleCancelModificar}>Cancelar</button>
                </div>
              </div>
            </div>
          )}

        </div>
    )
}

export default DependenciaTab;