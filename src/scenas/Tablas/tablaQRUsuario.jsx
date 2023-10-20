import { useEffect, useState } from "react";
import { useUserId } from "../login/UserIdContext";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const columns = [
    { 
      field: 'codigo', 
      headerName: 'Codigo', 
      width: 120 
    },
    {
        field: 'nombre',
        headerName: 'Nombre del Usuario',
        width: 150
    },
    {
        field: 'nombre_articulo',
        headerName: 'Descripcion',
        width: 300,
        editable: true,
    },
    {
        field: 'cantidad',
        headerName: 'Cantidad',
        width: 100,
        editable: true,
      },
    {
      field: 'observaciones',
      headerName: 'Observaciones',
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
                    <img src="/documento.png" alt="" />
                </div>
            </div>
        }
    },
    
  ];

const QRUsuarioTab = () => {
    const [data, setData] = useState([]);
    const { userId } = useUserId();

    const [qrData, setQRData] = useState(null);
    const [isAddUserOpen, setAddUserOpen] = useState(false);

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

      const handleViewClick = async (id_articulo) => {
        try {
          const response = await fetch(`http://localhost:4000/articulos/qr/${id_articulo}`);
          
          if (!response.ok) {
            throw new Error('Error al obtener datos de la API');
          }
          
          const qrData  = await response.json();
          setQRData(qrData[0].qr);
          console.log(setQRData)
          
          // Actualiza el estado con la URL de la imagen QR
          // setQRData(qrDataString);
          setAddUserOpen(true); // Abre la ventana modal
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
                columns={columns.map((column) =>
                    column.field === 'actions'
                      ? {
                          ...column,
                          renderCell: (params) => (
                            <div className='action'>
                              <div className='view'>
                                <img src="/documento.png" alt="" onClick={() => handleViewClick(params.row.id_articulo)} />
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
                disableRowSelectionOnClick
                disableColumnFilter
                disableDensitySelector
                disableColumnSelector
            />
        </div>
    )
}

export default QRUsuarioTab;