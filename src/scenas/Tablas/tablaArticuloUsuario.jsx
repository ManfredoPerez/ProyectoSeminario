import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import "./style.css"

import { useEffect, useState } from 'react';
import { useUserId } from '../login/UserIdContext';

const columns = [
    { 
      field: 'codigo', 
      headerName: 'Codigo', 
      width: 120 
    },
    {
        field: 'cantidad',
        headerName: 'Cantidad',
        width: 200,
        editable: true,
      },
      {
        field: 'nombre_articulo',
        headerName: 'Descripcion',
        width: 300,
        editable: true,
      },
      {
        field: 'valor_unitario',
        headerName: 'Valor Unitario',
        width: 250,
        editable: true,
      },


    {
      field: 'observaciones',
      headerName: 'Observaciones',
      width: 250,
      editable: true,
    },
    

    
    
  ];
  
  

const ArticuloUsuarioTab = () => {

    const [data, setData] = useState([]);
    const { userId } = useUserId();


    
    const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:4000/articulos/articulo/${userId}`); 
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
       }, []); // eslint-disable-line react-hooks/exhaustive-deps
      

    return(
        <div className='dataTable'>
            <DataGrid
                className='dataGrid'
                rows={data}
                columns= {columns}

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
                disableRowSelectionOnClick
                disableColumnFilter
                disableDensitySelector
                disableColumnSelector
            />
           

        </div>
    )
}

export default ArticuloUsuarioTab;