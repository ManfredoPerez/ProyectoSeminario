import UsuarioTabReport from "../Tablas/tableUsuarioReport";

const HojaServicio = () => {
    
    
    return (
      <div>
        <div className="container text-center mt-5">
          <h1>Hoja de servicio</h1>
        </div>
          <div className="users">
            <UsuarioTabReport slug="user"/>

          </div>
        </div>
      );
}

export default HojaServicio;