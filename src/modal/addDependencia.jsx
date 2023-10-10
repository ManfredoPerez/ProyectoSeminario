import "./style.css";


const AddDependencia = ({setOpenModal}) => {
    return (
        <div className="modalBackground">
          <div className="modalContainer" style={{width: "500px", height: "350px"}}>
            <div className="titleCloseBtn">
              <button
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                X
              </button>
            </div>
          <div className="title" style={{margin: "20px"}}>
          <h3>Agregar nueva Dependencia</h3>
        </div>
        <form action="">
          <div className="form-group mb-2">
            <label for="exampleInputPassword1">Nombre de la dependencia</label>
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

export default AddDependencia;