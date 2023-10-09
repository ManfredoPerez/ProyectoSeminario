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
        <form action="">
          <div className="form-group mb-2">
            <label for="exampleInputPassword1">Usuario</label>
            <input type="text" class="form-control" />
          </div>

          <div className="form-group">
            <label for="exampleInputPassword1">Nombre</label>
            <input type="text" class="form-control" />
          </div>

          <div className="form-group">
            <label for="exampleInputPassword1">Apellido</label>
            <input type="text" class="form-control" />
          </div>

          <div className="form-group">
            <label for="exampleInputPassword1">Contraseña</label>
            <input type="password" class="form-control" />
          </div>

          <div className="form-group">
            <label for="exampleInputPassword1">Codigo</label>
            <input type="text" class="form-control" />
          </div>

          <div class="form-group">
            <label for="exampleFormControlSelect1">Rol</label>
            <select class="form-control" id="exampleFormControlSelect1">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>

          <div class="form-group">
            <label for="exampleFormControlSelect1">Cargo</label>
            <select class="form-control" id="exampleFormControlSelect1">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>

          <div class="form-group">
            <label for="exampleFormControlSelect1">Dependencia</label>
            <select class="form-control" id="exampleFormControlSelect1">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
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

export default AddUser;