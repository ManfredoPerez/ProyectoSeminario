import { getConnection } from "./db/database";

const getCargos = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query("SELECT * FROM cargo;");
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getCargoById = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.query("SELECT * FROM cargo WHERE Id_cargo = ?;", [id]);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addCargo = async (req, res) => {
  try {
    const { Id_cargo, Nombre_cargo } = req.body;
    if (!Id_cargo || !Nombre_cargo) {
      res.status(400).json({ message: "Bad Request. Please fill all fields." });
      return;
    }
    const cargo = { Id_cargo, Nombre_cargo };
    const connection = await getConnection();
    const result = await connection.query("INSERT INTO cargo SET ?", cargo);
    res.json({ message: "Cargo Added" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteCargo = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.query("DELETE FROM cargo WHERE Id_cargo = ?;", [id]);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateCargo = async (req, res) => {
  try {
    const { id } = req.params;
    const { Id_cargo, Nombre_cargo } = req.body;
    if (!Id_cargo || !Nombre_cargo) {
      res.status(400).json({ message: "Bad Request. Please fill all fields." });
      return;
    }
    const cargo = { Id_cargo, Nombre_cargo };
    const connection = await getConnection();
    const result = await connection.query("UPDATE cargo SET ? WHERE Id_cargo = ?;", [cargo, id]);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const methods = {
  getCargos,
  getCargoById,
  addCargo,
  updateCargo,
  deleteCargo
};
