import { useState } from "react";
import ArticuloTab from "../Tablas/tablaArticulos";
import AddArticulo from "../../modal/addArticulo";

const Articulos = () => {
    const [modalOpen, setModalOpen] = useState(false);
    
    
    return (
      <div >
          <div className="users">
              <div className="info">
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <h1>Articulos</h1>
                  <button
                      className="btnAdd"
                      onClick={() => {
                          setModalOpen(true);
                      }}
                  >Agregar Usuario</button>
              </div>
                  <ArticuloTab slug="users"/>
                  {modalOpen && <AddArticulo setOpenModal={setModalOpen} />}
          </div>
      </div>
      );
}

export default Articulos;