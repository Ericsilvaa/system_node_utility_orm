const database = require("../models");

class PessoaController {
  static async getAllPeople(req, res) {
    try {
      // findAll => pode receber um objeto
      const allPeople = await database.Pessoas.findAll();
      return res.status(200).json(allPeople);
    } catch (error) {
      return res.status(500).send({ error: error });
    }
  }

  static async getPerson(req, res) {
    const { id } = req.params;
    try {
      const person = await database.Pessoas.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(person);
    } catch (error) {
      return res.status(500).send({ error: error });
    }
  }

  static async createPerson(req, res) {
    const newPerson = req.body;
    try {
      const newPersonCreated = await database.Pessoas.create(newPerson);
      return res.status(200).json(newPersonCreated);
    } catch (error) {
      return res.status(500).send({ error: error });
    }
  }

  static async updatePerson(req, res) {
    const { id } = req.params;
    const updatePerson = req.body;
    try {
      await database.Pessoas.update(updatePerson, {
        where: { id: Number(id) },
      });

      const personUpdated = database.Pessoas.findOne({
        where: { id: Number(id) },
      });

      return res.status(200).json(personUpdated);
    } catch (error) {
      return res.status(500).send({ error: error });
    }
  }

  static async deletePerson(req, res) {
    const { id } = req.params;
    try {
      // return quantity of the items deleted
      const deletePerson = await database.Pessoas.destroy({ where: { id } });

      return res.status(200).json({
        user_delete: deletePerson,
        message: "person deleted successfully",
      });
    } catch (error) {
      return res.status(500).send({ error: error });
    }
  }

  // TODO: Matriculas!!!
  // matricula está aqui, pois não será inserido nada nela sozinha, apenas terá associations info of others tables.
  static async getPersonByMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    try {
      const person = await database.Matriculas.findOne({
        where: { id: Number(matriculaId), estudante_id: Number(estudanteId) },
      });
      return res.status(200).json(person);
    } catch (error) {
      return res.status(500).send({ error: error });
    }
  }

  static async createMatricula(req, res) {
    const { estudanteId } = req.params;
    const newMatricula = { ...req.body, estudante_id: Number(estudanteId) };
    try {
      const newMatriculaCreated = await database.Matriculas.create(
        newMatricula
      );
      return res.status(200).json(newMatriculaCreated);
    } catch (error) {
      return res.status(500).send({ error: error });
    }
  }

  static async updateMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    const updateMatricula = req.body;
    try {
      await database.Matriculas.update(updateMatricula, {
        where: { id: Number(matriculaId), estudante_id: Number(estudanteId) },
      });

      // update não retorna, apenas 0 or 1
      const matriculaUpdated = database.Matriculas.findOne({
        where: { id: Number(matriculaId) },
      });

      return res.status(200).json(matriculaUpdated);
    } catch (error) {
      return res.status(500).send({ error: error });
    }
  }

  static async deleteMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    try {
      // return quantity of the items deleted
      const deletePerson = await database.Matriculas.destroy({
        where: { id: Number(matriculaId), estudante_id: Number(estudanteId) },
      });

      return res.status(200).json({
        user_delete: deletePerson,
        message: "person deleted successfully",
      });
    } catch (error) {
      return res.status(500).send({ error: error });
    }
  }
}

module.exports = PessoaController;
