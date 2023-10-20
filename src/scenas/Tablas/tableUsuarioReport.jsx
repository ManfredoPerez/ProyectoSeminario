import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./style.css"
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

const colums = [
    {
        field: 'id_usuario', 
        headerName: 'ID',
        width: 90 
    },
    {
      field: 'nombre',
      headerName: 'Nombre',
      width: 250,
      editable: true,
    },
    {
      field: 'apellido',
      headerName: 'Apellido',
      width: 250,
      editable: true,
    },
    
    {
      field: 'codigo',
      headerName: 'Codigo',
      width: 200,
      editable: true,
    },
    {
        field: "actions",
        headerName: "Acciones",
        width: 200,
        renderCell: (params) => {
            return <div className='action'>
                <div className="view">
                    <img src="/documento.png" alt="" />
                </div>
            </div>
        }
    },
]


const columsUser = [
    {
        field: 'codigo', 
        headerName: 'Codigo',
        width: 90 
    },
    {
      field: 'cantidad',
      headerName: 'Cantidad',
      width: 100,
      editable: true,
    },
    {
      field: 'nombre_articulo',
      headerName: 'Descripcion',
      width: 250,
      editable: true,
    },
    
    {
      field: 'valor_unitario',
      headerName: 'Valor',
      width: 100,
      editable: true,
    },
    {
      field: 'valor_total',
      headerName: 'Total',
      width: 100,
      editable: true,
    },
    {
      field: 'valor_baja',
      headerName: 'Valor Baja',
      width: 100,
      editable: true,
    },
    {
      field: 'observaciones',
      headerName: 'Observaciones',
      width: 200,
      editable: true,
    },
]

const UsuarioTabReport = () => {

    const [data, setData] = useState([]);
    const [dataUser, setDataUser ] = useState([]);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    
    const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:4000/usuarios/responsable');
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

      const fetchDataUSer = async () => {
        try {
          const response = await fetch(`http://localhost:4000/articulos/articulo/${selectedUserId}`);
          if (!response.ok) {
            throw new Error('Error al obtener datos de la API');
          }
          const dataUser = await response.json();
          console.log(dataUser)
          const dataWithIds = dataUser.map((item, index) => ({ ...item, id: index }));
          setDataUser(dataWithIds);
        } catch (error) {
          console.error('Error al obtener datos de la API:', error);
        }
      };

      // PARA GENERAR EL PDF
      const generatePdf = () => {
        const doc = new jsPDF({ orientation: "landscape" });
    
        const marginTop = 50;
        doc.text("Tarjeta de Responsabilidad", doc.internal.pageSize.getWidth() / 2, marginTop, { align: "center" });
        doc.text(
          `Nombre del Empleado Responsable: ${dataUser[0]?.nombre} ${dataUser[0]?.apellido}`,
          10,
          marginTop + 10
        );
        doc.text(`Dependencia: ${dataUser[0]?.nombre_dependencia}`, 10, marginTop + 20);
        doc.text(`Cargo: ${dataUser[0]?.nombre_cargo}`, 10,marginTop + 30);
        doc.text("Código:", 10, marginTop + 40);
        doc.text("Fecha:", 10, marginTop + 50);
    
        const headers = [
          "Código",
          "Cantidad",
          "Descripción",
          "Valor",
          "Total",
          "Valor Baja",
          "Observaciones",
        ];
        const data = dataUser.map((user) => [
          user.codigo,
          user.cantidad,
          user.nombre_articulo,
          user.valor_unitario,
          user.valor_total,
          user.valor_baja,
          user.observaciones,
        ]);
        doc.autoTable({ head: [headers], body: data, startY: marginTop + 60 });
    
        // Obtén el contenido del PDF como base64
        const pdfData = doc.output("datauristring");
    
        // Muestra el PDF en una nueva ventana o pestaña
        const pdfWindow = window.open();
        pdfWindow.document.open();
        pdfWindow.document.write('<iframe width="100%" height="100%" src="' + pdfData + '"></iframe>');
        pdfWindow.document.close();
    
        setDialogOpen(true);
      };

      // GENERAR EXCEL 
      const generateExcel = () => {
        const userName = `${dataUser[0]?.nombre}_${dataUser[0]?.apellido}`;
        const fileName = `datos_${userName}.xlsx`;
      
        // Crear una matriz de datos que incluya los encabezados y la información adicional
        const excelData = [
          ["Tarjeta de Responsabilidad"],
          [
            `Nombre del Empleado Responsable: ${dataUser[0]?.nombre} ${dataUser[0]?.apellido}`,
          ],
          [`Dependencia: ${dataUser[0]?.nombre_dependencia}`],
          [`Cargo: ${dataUser[0]?.nombre_cargo}`],
          ["Código:"],
          ["Fecha:"],
          [],
          ["Código", "Cantidad", "Descripción", "Valor", "Total", "Valor Baja", "Observaciones"],
          ...dataUser.map((user) => [
            user.codigo,
            user.cantidad,
            user.nombre_articulo,
            user.valor_unitario,
            user.valor_total,
            user.valor_baja,
            user.observaciones,
          ]),
        ];
      
        // Crear un objeto de libro de Excel
        const wb = XLSX.utils.book_new();
      
        // Crear una hoja de cálculo en el libro y agregar los datos y la información adicional
        const wsData = XLSX.utils.aoa_to_sheet(excelData);
      
        // Definir el ancho de las columnas (por ejemplo, ancho 15 para todas las columnas)
        wsData['!cols'] = [{ wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }];
      
        XLSX.utils.book_append_sheet(wb, wsData, "Datos");
      
        // Guardar el archivo Excel
        XLSX.writeFile(wb, fileName);
      };

      useEffect(() => {
        fetchData();
      }, []);
    
      useEffect(() => {
        fetchDataUSer();
      }, [selectedUserId]); // eslint-disable-line react-hooks/exhaustive-deps

      const handleViewClick = (userId) => {
        setSelectedUserId(userId);
        console.log(userId)
        setDialogOpen(true);
      };
      
      const handleCancelDelete = () => {
        setDialogOpen(false);
        // window.history.back();
      };


    return (
        <div> 
        <div className="dataTable">
            <DataGrid
                className='dataGrid'
                rows={data}
                // columns={columns}
                columns={colums.map((column) =>
                    column.field === 'actions'
                    ? {
                        ...column,
                        renderCell: (params) => (
                        <div className='action'>
                            <div className='view' onClick={() => handleViewClick(params.row.id_usuario)}>
                                <img src='/documento.png' alt='' />
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

            

        </div>
            {isDialogOpen && (
                // <div className='confirmation-dialog'>
                //     <div className='confirmation-dialog-1'>
                //         <p>¿Está seguro de que desea eliminar este cargo?</p>
                //         <div className="footer">
                //         <button id="cancelBtn" onClick={handleCancelDelete}>Cancelar</button>
                //         {/* <button onClick={handleConfirmDelete}>Aceptar</button> */}
                //         </div>
                //     </div>
                // </div>
                <div className="modalBackground">
                    <div className="modalContainer" style={{width: "1100px", height: "700px"}}>
                        
                        <div className="title">
                            <h3>Tarjeta de Responsabilidad</h3>
                            <br />
                        </div>
                        <div>
                            <h5>Nombre del Empleado Responsable:  {dataUser[0]?.nombre}  {dataUser[0]?.apellido}</h5>
                            <h5>Dependencia:  {dataUser[0]?.nombre_dependencia}</h5>
                            <h5>Cargo:  {dataUser[0]?.nombre_cargo}</h5>
                            <h5>Codigo: </h5>
                        </div>

                        <div className="">
                            <DataGrid
                                className='dataGrid'
                                rows={dataUser}
                                // columns={columns}
                                columns={columsUser}  
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                        pageSize: 5,
                                        },
                                    },
                                    }}
                                    slots={{toolbar: GridToolbar}}
                                    // slotProps={{
                                    //     toolbar: {
                                    //         showQuickFilter: true,
                                    //         quickFilterProps: { debounceMs: 500 },
                                    //     }
                                    // }}
                                    pageSizeOptions={[5]}
                                    disableRowSelectionOnClick
                                    disableColumnFilter
                                    disableDensitySelector
                                    disableColumnSelector 
                            />   

                        </div>

                        <div className="footer">
                            <button id="cancelBtn" onClick={handleCancelDelete}>Cerrar</button>
                            <button id="generatePdfBtn" onClick={generatePdf}>
                              Generar PDF
                            </button>
                            <button id="generateExcelBtn" style={{color: "white"}} onClick={generateExcel}>
                              Generar Excel
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default UsuarioTabReport;