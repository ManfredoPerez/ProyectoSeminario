import "./style.css";


const AddUser = ({setOpenModal}) => {
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
          <h3>Agregar nuevo Usuario</h3>
        </div>
        <div className="body">
          <form action="">
            <label htmlFor="">Nombre</label>
            <input type="text"placeholder="Agregar nombre" />
            <label htmlFor="">Apellido</label>
            <input type="text"placeholder="Agregar nombre" />
            <label htmlFor="">Contraseña</label>
            <input type="text"placeholder="Agregar nombre" />
            <label htmlFor="">Hola</label>
            <input type="text"placeholder="Agregar nombre" />
          </form>
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
          <button>Continue</button>
        </div>
      </div>
    </div>
    )
}

export default AddUser;