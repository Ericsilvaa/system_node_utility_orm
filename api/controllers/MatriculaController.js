const Sequelize = require("sequelize");
const { MatriculasServices } = require("../services");
const matriculasServices = new MatriculasServices();

class MatriculaController {
  static async getPersonByMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    const where = {
      id: Number(matriculaId),
      estudante_id: Number(estudanteId),
    };

    try {
      const person = await matriculasServices.getOneRegister(where);
      return res.status(200).json(person);
    } catch (error) {
      return res.status(500).send({ error: error });
    }
  }
}

module.exports = MatriculaController;
