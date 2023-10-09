import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import "./style.css"

import { useEffect, useState } from 'react';


const columns = [
    { field: 'id_usuario', headerName: 'ID', width: 90 },
    // {
    //     field: "avatar", headerName: "Avatar", width:100,
    //     renderCell: (params)=> {
    //         return <img src={params.row.img || "/logoMuni.png"} alt='' />
    //     },
    // },
    {
      field: 'nombre_usuario',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'nombre',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
      field: 'apellido',
      headerName: 'Age',
      width: 110,
      editable: true,
    },
    {
      field: 'contrasena',
      headerName: 'Age',
      width: 110,
      editable: true,
    },
    {
      field: 'codigo',
      headerName: 'Age',
      width: 110,
      editable: true,
    },
    {
      field: 'id_rol',
      headerName: 'Age',
      width: 110,
      editable: true,
    },
    {
      field: 'id_cargo',
      headerName: 'Age',
      width: 110,
      editable: true,
    },
    {
      field: 'id_dependencia',
      headerName: 'Age',
      width: 110,
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
  
  

const UsuarioTab = () => {

    const [data, setData] = useState([]);

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
      

  useEffect(() => {
    fetchData();
  }, []); 

    return(
        <div className='dataTable'>
            <DataGrid
                className='dataGrid'
                rows={data}
                columns={columns}
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
        </div>
    )
}

export default UsuarioTab;