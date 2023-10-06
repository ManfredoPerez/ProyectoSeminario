import { getConnection } from "./db/database";

const getArticulos = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query("SELECT * FROM articulos;");
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getArticuloById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.query("SELECT * FROM articulos WHERE Id_articulo = ?;", [id]);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addArticulo = async (req, res) => {
  try {
    const {
      Id_usuario,
      Codigo,
      Nombre_articulo,
      No_serie,
      Valor_unitario,
      Valor_total,
      Valor_baja,
      Observaciones,
      Qr,
      Cantidad
    } = req.body;

    if (
      !Id_usuario ||
      !Codigo ||
      !Nombre_articulo ||
      !No_serie ||
      !Valor_unitario ||
      !Valor_total ||
      !Valor_baja ||
      !Observaciones ||
      !Qr ||
      !Cantidad
    ) {
      res.status(400).json({ message: "Bad Request. Please fill all fields." });
      return;
    }

    const articulo = {
      Id_usuario,
      Codigo,
      Nombre_articulo,
      No_serie,
      Valor_unitario,
      Valor_total,
      Valor_baja,
      Observaciones,
      Qr,
      Cantidad
    };

    const connection = await getConnection();
    const result = await connection.query("INSERT INTO articulos SET ?", articulo);
    res.json({ message: "Articulo Added" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteArticulo = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.query("DELETE FROM articulos WHERE Id_articulo = ?;", [id]);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateArticulo = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      Id_usuario,
      Codigo,
      Nombre_articulo,
      No_serie,
      Valor_unitario,
      Valor_total,
      Valor_baja,
      Observaciones,
      Qr,
      Cantidad
    } = req.body;

    if (
      !Id_usuario ||
      !Codigo ||
      !Nombre_articulo ||
      !No_serie ||
      !Valor_unitario ||
      !Valor_total ||
      !Valor_baja ||
      !Observaciones ||
      !Qr ||
      !Cantidad
    ) {
      res.status(400).json({ message: "Bad Request. Please fill all fields." });
      return;
    }

    const articulo = {
      Id_usuario,
      Codigo,
      Nombre_articulo,
      No_serie,
      Valor_unitario,
      Valor_total,
      Valor_baja,
      Observaciones,
      Qr,
      Cantidad
    };

    const connection = await getConnection();
    const result = await connection.query("UPDATE articulos SET ? WHERE Id_articulo = ?;", [articulo, id]);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const methods = {
  getArticulos,
  getArticuloById,
  addArticulo,
  updateArticulo,
  deleteArticulo
};