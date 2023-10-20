import ArticuloQR from "../Tablas/tablaQR";


const QR = () => {
    return (
        <div> 
            <div className="container text-center mt-5">
                <h1>QR</h1>
            </div>

            <div className="qr">
                <ArticuloQR slug="qr"/>
            </div>
        </div>
    )
}

export default QR;