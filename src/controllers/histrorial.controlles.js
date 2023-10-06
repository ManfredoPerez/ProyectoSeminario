import { getConnection } from "./db/database";

const getHistoriales = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query("SELECT * FROM historial;");
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getHistorialById = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.query("SELECT * FROM historial WHERE id_historial = ?;", [id]);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addHistorial = async (req, res) => {
  try {
    const { id_historial, id_articulo, fecha } = req.body;
    if (!id_historial || !id_articulo || !fecha) {
      res.status(400).json({ message: "Bad Request. Please fill all fields." });
      return;
    }
    const historial = { id_historial, id_articulo, fecha };
    const connection = await getConnection();
    const result = await connection.query("INSERT INTO historial SET ?", historial);
    res.json({ message: "Historial Added" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteHistorial = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.query("DELETE FROM historial WHERE id_historial = ?;", [id]);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateHistorial = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_historial, id_articulo, fecha } = req.body;
    if (!id_historial || !id_articulo || !fecha) {
      res.status(400).json({ message: "Bad Request. Please fill all fields." });
      return;
    }
    const historial = { id_historial, id_articulo, fecha };
    const connection = await getConnection();
    const result = await connection.query("UPDATE historial SET ? WHERE id_historial = ?;", [historial, id]);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const methods = {
  getHistoriales,
  getHistorialById,
  addHistorial,
  updateHistorial,
  deleteHistorial
};
