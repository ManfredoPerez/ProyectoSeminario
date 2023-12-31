import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import "./style.css";

import { useEffect, useState } from 'react';

const columns = [
  { field: 'id_cargo', headerName: 'ID', width: 90 },
  {
    field: 'nombre_dependencia',
    headerName: 'Nombre de la dependencia',
    width: 250,
    editable: true,
  },
  {
    field: 'nombre_cargo',
    headerName: 'Nombre del Cargo',
    width: 200,
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
  const [editedNombreCargo, setEditedNombreCargo] = useState(''); 
  const [editingCargoId, setEditingCargoId] = useState(null);
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


  const handleViewClick = (id_cargo) => {
    const cargos = data.find((item) => item.id_cargo === id_cargo);
    if (cargos) {
      setEditedNombreCargo(cargos.nombre_cargo);
      setEditingCargoId(id_cargo);
      setAddUserOpen(true); // Abre el formulario de edición
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []); 



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
  const handleUpdateCargo = async (e) => {
    e.preventDefault();
    try {
      // Crea un objeto con el campo 'nombre_cargo'
      const cargoData = {
        nombre_cargo: editedNombreCargo,
      };
      // Realiza una solicitud PUT para actualizar el campo 'nombre_cargo' del cargo
      const response = await fetch(`http://localhost:4000/cargos/${editingCargoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cargoData),
      });
  
      if (response.ok) {
        setAddUserOpen(false); // Cierra el formulario de edición
        fetchData(); // Actualiza la lista de dependencias
      } else {
        console.error('Error al actualizar el cargo.');
      }
    } catch (error) {
      console.error('Error al actualizar el cargo:', error);
    }
  };
  
  const handleCancelDelete = () => {
    setDialogOpen(false);
    window.history.back();
  };

  const handleCancelModificar = () => {
    setAddUserOpen(false);
  }

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
                          <img src="/view.svg" alt="" onClick={() => handleViewClick(params.row.id_cargo)} />
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
            <div className='confirmation-dialog'>
              <div className='confirmation-dialog-1'>
                <h4>Editar Cargo</h4>
                <form onSubmit={handleUpdateCargo}>
                  <label>Nombre del Cargo:</label>
                  <br></br>
                  <input
                    className="form-control"
                    type="text"
                    value={editedNombreCargo}
                    onChange={(e) => setEditedNombreCargo(e.target.value)}
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
export default CargoTab;