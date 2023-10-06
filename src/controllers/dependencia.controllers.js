import { getConnection } from "./db/database";

const getDependencias = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query("SELECT * FROM dependencia;");
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getDependenciaById = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.query("SELECT * FROM dependencia WHERE id_dependencia = ?;", [id]);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addDependencia = async (req, res) => {
  try {
    const { id_dependencia, nombre_dependencia } = req.body;
    if (!id_dependencia || !nombre_dependencia) {
      res.status(400).json({ message: "Bad Request. Please fill all fields." });
      return;
    }
    const dependencia = { id_dependencia, nombre_dependencia };
    const connection = await getConnection();
    const result = await connection.query("INSERT INTO dependencia SET ?", dependencia);
    res.json({ message: "Dependencia Added" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteDependencia = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.query("DELETE FROM dependencia WHERE id_dependencia = ?;", [id]);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateDependencia = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_dependencia, nombre_dependencia } = req.body;
    if (!id_dependencia || !nombre_dependencia) {
      res.status(400).json({ message: "Bad Request. Please fill all fields." });
      return;
    }
    const dependencia = { id_dependencia, nombre_dependencia };
    const connection = await getConnection();
    const result = await connection.query("UPDATE dependencia SET ? WHERE id_dependencia = ?;", [dependencia, id]);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const methods = {
  getDependencias,
  getDependenciaById,
  addDependencia,
  updateDependencia,
  deleteDependencia
};
