import QRUsuarioTab from "../Tablas/tablaQRUsuario";


const QRUsuario = () => {
    return(
        <div>
            <div className="container text-center mt-5">
                <h1>TUS QR'S</h1>
            </div>

            <QRUsuarioTab slug="qr-usuario" />
        </div>
    )
}

export default QRUsuario;