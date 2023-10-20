import QRCode from "react-qr-code";
import "./style.css";
import { useEffect, useState } from "react";
import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';



const AddArticulo = ({setOpenModal}) => {
    const [articuloData, setArticuloData ] = useState({
        id_usuario: '',
        codigo: '',
        nombre_articulo: '',
        no_serie: '',
        valor_unitario: '',
        valor_baja: '',
        observaciones: '',
        qr: '',
        cantidad: '',
    })

    const [usuarios, setUsuarios] = useState([]);
    const [showQR, setShowQR] = useState(false);
    // const qrRef = useRef(null);
    // const qrValueRef = useRef(null);

    const handleClose = () => {
        setShowQR(false);
        setOpenModal(false);
      };
    


      const handlePrint = () => {
        // qrValueRef.current = articuloData.qr;
        const modal = document.querySelector('.printable-modal'); // Asegúrate de usar el selector correcto

        if (modal) {
        // Captura el contenido del modal como una imagen
        html2canvas(modal).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');

    

            // Abre una ventana emergente con la imagen del código QR en el tamaño especificado
            const printWindow = window.open('', '', 'width=842,height=595');
            printWindow.document.open();
            printWindow.document.write(
            `<img src="${imgData}" style="width: 50%; height: 40%;" />`
            );
            printWindow.document.close();

            // Espera a que la imagen se cargue antes de imprimir
            printWindow.onload = () => {
            printWindow.print();
            printWindow.close();
            };
        })
        setArticuloData({
            id_usuario: '',
            codigo: '',
            nombre_articulo: '',
            no_serie: '',
            valor_unitario: '',
            valor_baja: '',
            observaciones: '',
            qr: '',
            cantidad: '',
        });
        }

        
        
      };

      const handleShowQR = () => {
        generateQRCode();
        setShowQR(true);
      };

    useEffect(() => {
        fetch('http://localhost:4000/usuarios/')
        .then(response => response.json())
        .then(data => {
            setUsuarios(data);
        })
        .catch(error => {
            console.error('Error al obtener los usuarios', error);
        });
    })

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setArticuloData({ ...articuloData, [name]: value})
    }

    const generateQRCode = () => {  

        const qrData = `
            USUARIO: 
                ${articuloData.id_usuario}

            CÓDIGO: 
                ${articuloData.codigo}

            NOMBRE DEL ARTICULO: 
                ${articuloData.nombre_articulo}

            No. SERIE: 
                ${articuloData.no_serie}

            VALOR UNITARIO: 
                ${articuloData.valor_unitario}

            VALOR BAJA: 
                ${articuloData.valor_baja}

            OBSERVACIONES: 
                ${articuloData.observaciones}
                
        `;

        console.log(qrData);

        // Almacena la cadena de texto en el estado
        setArticuloData({ ...articuloData, qr: qrData });
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try{

            generateQRCode();
            // console.log("Datos que se enviarán:", articuloData); 

            const response = await fetch('http://localhost:4000/articulos/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(articuloData),
            });

            if (response.ok) {
                setArticuloData({
                    id_usuario: '',
                    codigo: '',
                    nombre_articulo: '',
                    no_serie: '',
                    valor_unitario: '',
                    valor_baja: '',
                    observaciones: '',
                    qr: '',
                    cantidad: '',
                });

                // setOpenModal(false);
                handleShowQR();
            }
        }catch (error) {
            console.error('Error de conexion');
        }
    }


    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button
                        onClick={() => {
                        setOpenModal(false);
                        }}
                    >
                    X
                    </button>
                </div>

                <div className="title">
                    <h3>Agregar nuevo Articulo</h3>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label for="exampleFormControlSelect1">Responsable </label>
                            <select 
                                className="form-control" 
                                id="id_usuario"
                                name="id_usuario"
                                value={articuloData.id_usuario}
                                onChange={handleInputChange}
                            >
                                <option value="">Elige un responsable</option>
                                    {usuarios.map(usuario => (
                                    <option key={usuario.id_usuario} value={usuario.id_usuario}>
                                         {usuario.codigo} {usuario.nombre} {usuario.apellido} 
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group col-md-6">
                            <label for="inputPassword4">Codigo Articulo</label>
                            <input 
                                type="text" 
                                id="codigo"
                                className="form-control" 
                                name="codigo"
                                value={articuloData.codigo}
                                onChange={handleInputChange}
                                placeholder="Eje '0025'"/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label for="inputAddress">Nombre Articulo</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="nombre_articulo"
                            name="nombre_articulo"
                            value={articuloData.nombre_articulo}
                            onChange={handleInputChange}
                            placeholder="Eje 'PC'"/>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label for="inputEmail4">No. serie</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="no_serie"
                                name="no_serie"
                                value={articuloData.no_serie}
                                onChange={handleInputChange}
                                placeholder="Eje '11478'"/>
                        </div>
                        <div className="form-group col-md-6">
                            <label for="inputPassword4">Valor Unitario</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="valor_unitario"
                                name="valor_unitario"
                                value={articuloData.valor_unitario}
                                onChange={handleInputChange}
                                placeholder="Eje '100'"/>
                        </div>
                    </div>


                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label for="inputEmail4">Valor Baja</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="valor_baja"
                                name="valor_baja"
                                value={articuloData.valor_baja}
                                onChange={handleInputChange}
                                placeholder="Eje '10'"/>
                        </div>
                        <div className="form-group col-md-6">
                            <label for="inputPassword4">Cantidad</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="cantidad"
                                name="cantidad"
                                value={articuloData.cantidad}
                                onChange={handleInputChange}
                                placeholder="Eje '5'"/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label for="inputAddress">Observaciones</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="observaciones"
                            name="observaciones"
                            value={articuloData.observaciones}
                            onChange={handleInputChange}
                            placeholder=""/>
                    </div>

                    <div className="footer">
                        <button
                            onClick={() => {
                            setOpenModal(false);
                            }}
                            id="cancelBtn"
                            >
                            Cancel
                        </button>
                        <button type="submit" onClick={handleShowQR}>Continue</button>
                        
                    </div>
                    {showQR && (
                        <div
                        style={{
                            position: "fixed",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            backgroundColor: "white",
                            padding: "20px",
                            borderRadius: "5px",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                            zIndex: 999,
                        }}
                        >
                        <button
                            onClick={handleClose}
                            style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            background: "none",
                            border: "none",
                            fontSize: "20px",
                            cursor: "pointer",
                            }}
                        >
                            Cerrar
                        </button>
                        <button
                            onClick={handlePrint}
                            style={{
                            position: "absolute",
                            top: "10px",
                            left: "10px",
                            background: "none",
                            border: "none",
                            fontSize: "20px",
                            cursor: "pointer",
                            }}
                        >
                            Imprimir
                        </button>
                        <br />
                            <h2>Código QR generado:</h2>
                        <div className="printable-modal">
                            <QRCode value={articuloData.qr} onChange={handleInputChange} />
                        </div>
                        
                        </div>
                    )}
                </form>
                

            </div>
        </div>
    )
}

export default AddArticulo;