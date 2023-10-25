import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const colums = [
    {
        field: 'id_historial', 
        headerName: 'ID',
        width: 70 
    },
    {
      field: 'nombre_usuario',
      headerName: 'Usuario',
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
      headerName: 'Nombre Articulo',
      width: 200,
      editable: true,
    },
    // {
    //   field: 'no_serie',
    //   headerName: 'Serie',
    //   width: 100,
    //   editable: true,
    // },
    // {
    //   field: 'valor_unitario',
    //   headerName: 'Valor U.',
    //   width: 100,
    //   editable: true,
    // },
    // {
    //   field: 'valor_baja',
    //   headerName: 'Valor B.',
    //   width: 100,
    //   editable: true,
    // },
    // {
    //   field: 'valor_total',
    //   headerName: 'Total',
    //   width: 100,
    //   editable: true,
    // },
    {
      field: 'cantidad',
      headerName: 'Cantidad',
      width: 100,
      editable: true,
    },
    {
      field: 'observaciones',
      headerName: 'Observaciones',
      width: 200,
      editable: true,
    },
    {
      field: 'fecha',
      headerName: 'Fecha',
      width: 200,
      editable: true,
    },
    
]


const HistorialTab = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:4000/historial');
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
      }, []);

    return (
        <div>
            <div className="dataTable">
                <DataGrid
                    className='dataGrid'
                    rows={data}
                    columns={colums}
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
                        pageSizeOptions={[15]}
                        // checkboxSelection
                        disableRowSelectionOnClick
                        disableColumnFilter
                        disableDensitySelector
                        disableColumnSelector
                    
                />
            </div>
        </div>
    )
}

export default HistorialTab;