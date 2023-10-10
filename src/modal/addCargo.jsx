import "./style.css";


const AddCargo = ({setOpenModal}) => {
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
          <h3>Agregar Nuevo Cargo</h3>
        </div>
        <form action="">
          <div className="form-group mb-2">
            <label for="exampleInputPassword1">Nombre del Cargo</label>
            <input type="text" class="form-control" />
          </div>
       

        </form>
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

export default AddCargo;