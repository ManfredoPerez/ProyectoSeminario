import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import QRCode from "react-qr-code";
import html2canvas from 'html2canvas';
import "./style.css"

const columns = [
    { field: 'id_articulo', headerName: 'ID', width: 90 },
    {
      field: 'codigo',
      headerName: 'Codigo',
      width: 150,
      editable: true,
    },
    {
      field: 'nombre',
      headerName: 'Nombre Usuario',
      width: 150,
      editable: true,
    },
    {
      field: 'nombre_articulo',
      headerName: 'Nombre Articulo',
      width: 150,
      editable: true,
    },
    {
      field: 'no_serie',
      headerName: 'No. Serie',
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
            </div>
        }
    },
]



const ArticuloQR = () => {
    const [data, setData] = useState([]);
    // const [selectedUserData, setSelectedUserData] = useState(null);
    const [isAddUserOpen, setAddUserOpen] = useState(false);
    const [qrData, setQRData] = useState(null);
    
    const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:4000/articulos/qr'); 
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
      
      const handleCancelVerQR = () => {
        setAddUserOpen(false);
      }

      useEffect(() => {
        fetchData();
      }, []);


    // const handleViewClick = (id_usuario) => {
    //     setSelectedUserData(id_usuario);
    //     setAddUserOpen(true);
    //   };
    const handlePrint = () => {
      const modal = document.querySelector('.printable-modal'); 

      if (modal) {
        // Captura el contenido del modal como una imagen
        html2canvas(modal).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
  
          // Abre una ventana emergente con la imagen del código QR en tamaño de página media carta
          const printWindow = window.open('', '', 'width=842,height=595');
          printWindow.document.open();
          printWindow.document.write(
            `<img src="${imgData}" style="width: 50%; height: 40%;" />`
          );
          printWindow.document.close();
  
          // Espera 
          printWindow.onload = () => {
            printWindow.print();
            printWindow.close();
          };
        });
      }
      
      
      
    };

    return (
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
                // checkboxSelection
                disableRowSelectionOnClick
                disableColumnFilter
                disableDensitySelector
                disableColumnSelector
            />

                {isAddUserOpen && (
                  <div className='confirmation-dialog' >
                    <div className='confirmation-dialog-1' style={{width: "400px", height: "450px"}}>
                      <div className="qr-image printable-modal">
                        <QRCode value={qrData} size={300} />
                      </div>
                      <div className="footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button id="cancelBtn" onClick={handleCancelVerQR}>Cancelar</button>
                        <button onClick={handlePrint}>Impirmir</button>
                      </div>
                    </div>
                  </div>
                )}
        </div>
    )
}

export default ArticuloQR;