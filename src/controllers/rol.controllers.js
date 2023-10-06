import { getConnection } from "./db/database";

const getRoles = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query("SELECT * FROM rol;");
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getRolById = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.query("SELECT * FROM rol WHERE Id_rol = ?;", [id]);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addRol = async (req, res) => {
  try {
    const { Id_rol, Tipo_rol } = req.body;
    if (!Id_rol || !Tipo_rol) {
      res.status(400).json({ message: "Bad Request. Please fill all fields." });
      return;
    }
    const rol = { Id_rol, Tipo_rol };
    const connection = await getConnection();
    const result = await connection.query("INSERT INTO rol SET ?", rol);
    res.json({ message: "Rol Added" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteRol = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.query("DELETE FROM rol WHERE id_rol = ?;", [id]);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateRol = async (req, res) => {
  try {
    const { id } = req.params;
    const { Id_rol, Tipo_rol } = req.body;
    if (!Id_rol || !Tipo_rol) {
      res.status(400).json({ message: "Bad Request. Please fill all fields." });
      return;
    }
    const rol = { Id_rol, Tipo_rol };
    const connection = await getConnection();
    const result = await connection.query("UPDATE rol SET ? WHERE Id_rol = ?;", [rol, id]);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const methods = {
  getRoles,
  getRolById,
  addRol,
  updateRol,
  deleteRol
};
