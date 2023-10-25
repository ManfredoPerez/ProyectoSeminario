import HistorialTab from "../Tablas/tablaHistorial";


const Historial = () => {
    
    
    return (
        <div>
          <div className="container text-center mt-5">
            <h1>Historial</h1>
          </div>

          <div className="historial">
            <HistorialTab slug="historial"/>
          </div>
        </div>
      );
}

export default Historial;