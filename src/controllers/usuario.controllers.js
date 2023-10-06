import { getConnection } from "./db/database";

const getUsuarios = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query("SELECT * FROM usuario;");
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getUsuario = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.query("SELECT * FROM usuario WHERE id = ?;", [id]);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addUsuario = async (req, res) => {
  try {
    const { name, lastname, birthdate, career, average } = req.body;
    if (!name || !lastname || !birthdate || !career || !average) {
      res.status(400).json({ message: "Bad Request. Please fill all fields." });
      return;
    }
    const student = { name, lastname, birthdate, career, average };
    const connection = await getConnection();
    const result = await connection.query("INSERT INTO usuario SET ?", student);
    res.json({ message: "Usuario Added" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.query("DELETE FROM usuario WHERE id = ?;", [id]);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastname, birthdate, career, average } = req.body;
    if (!name || !lastname || !birthdate || !career || !average) {
      res.status(400).json({ message: "Bad Request. Please fill all fields." });
      return;
    }
    const student = { name, lastname, birthdate, career, average };
    const connection = await getConnection();
    const result = await connection.query("UPDATE usuario SET ? WHERE id = ?;", [student, id]);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const methods = {
  getUsuarios,
  getUsuario,
  addUsuario,
  updateUsuario,
  deleteUsuario
};
