import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import "./style.css";

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

const CargoTab = () => {
  const [data, setData] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isAddUserOpen, setAddUserOpen] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [intervalCount, setIntervalCount] = useState(0);

  const updateData = async () => {
    try {
      const response = await fetch('http://localhost:4000/cargos');
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
      const response = await fetch('http://localhost:4000/cargos');
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

  const handleViewClick = (id_cargo) => {
    setSelectedUserData(id_cargo);
    setAddUserOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:4000/cargos/${selectedUserId}`, {
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

  const handleCancelDelete = () => {
    setDialogOpen(false);
    window.history.back();
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
                    <p>¿Está seguro de que desea eliminar este cargo?</p>
                    <div className="footer">
                      <button id="cancelBtn" onClick={handleCancelDelete}>Cancelar</button>
                      <button onClick={handleConfirmDelete}>Aceptar</button>
                    </div>
                  </div>
            </div>
          )}


      {isAddUserOpen && (
        <AddCargo
        //   setOpenModal={setAddUserOpen}
        //   userData={selectedUserData}
        setOpenModal={setAddUserOpen} updateCargoData={fetchData}
        />
      )}
    </div>
  );
}

export default CargoTab;