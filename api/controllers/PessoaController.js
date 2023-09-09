// const database = require("../models");
// const Sequelize = require("sequelize");

const { PessoasServices } = require("../services");
const pessoasServices = new PessoasServices();

class PessoaController {
  static async getAllPeopleActive(req, res) {
    try {
      // findAll => pode receber um objeto
      const allPeopleActive = await pessoasServices.getRegisterActive();
      return res.status(200).json(allPeopleActive);
    } catch (error) {
      return res.status(500).send({ error: error });
    }
  }

  static async getAllPeople(req, res) {
    try {
      // findAll => pode receber um objeto
      const allPeople = await pessoasServices.getAllRegister();
      return res.status(200).json(allPeople);
    } catch (error) {
      return res.status(500).send({ error: error });
    }
  }

  static async getPerson(req, res) {
    const { id } = req.params;
    try {
      const person = await pessoasServices.getOneRegister({ id: Number(id) });

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
      const update = await pessoasServices.updateRegister(updatePerson, {
        id: Number(id),
      });
      console.log("update", update);

      const personUpdated = await pessoasServices.getOneRegister({
        id: Number(id),
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
      const deletePerson = await database.Pessoas.destroy({
        where: { id: Number(id) },
      });

      return res.status(200).json({
        user_delete: deletePerson,
        message: "person deleted successfully",
      });
    } catch (error) {
      return res.status(500).send({ error: error });
    }
  }

  static async restorePersonRemoved(req, res) {
    const { id } = req.params;
    try {
      await database.Pessoas.restore({ where: { id: Number(id) } });
      return res
        .status(200)
        .json({ mensagem: `id ${id} restored successfully` });
    } catch (error) {
      return res.status(500).send({ error: error });
    }
  }

  // TODO: Matriculas!!!
  // matricula está aqui, pois não será inserido nada nela sozinha, apenas terá associations info of others tables.

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

  static async restauraMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    try {
      await database.Matriculas.restore({
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId),
        },
      });
      return res.status(200).json({ mensagem: `id ${id} restaurado` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getMatricula(req, res) {
    const { estudanteId } = req.params;
    try {
      // return quantity of the items deleted
      const findStudent = await database.Pessoas.findOne({
        where: { id: Number(estudanteId) },
      });

      const student = await findStudent.getaulasMatriculadas();

      return res.status(200).json({
        user_matricula: student,
        message: "person deleted successfully",
      });
    } catch (error) {
      return res.status(500).send({ error: error });
    }
  }

  static async getMatriculaByTurma(req, res) {
    const { turmaId } = req.params;
    // const { limit, order } = req.query;

    try {
      const allMatriculas = await database.Matriculas.findAndCountAll({
        where: { turma_id: Number(turmaId), status: "confirmado" },
        limit: 10,
        // order: [["estudante_id", "ASC or DESC"]],
      });
      /* 
        {
          where: {},
          limit: 10,
          order: [["coluna", "ASC or DESC"]]
        }
      */
      return res.status(200).json(allMatriculas);
    } catch (error) {
      return res.status(500).send({ error: error });
    }
  }

  static async getFullClasses(req, res) {
    const lotacaoTurma = 3;

    try {
      const fullClasses = await database.Matriculas.findAndCountAll({
        where: { status: "confirmado" },
        attributes: ["turma_id"],
        group: ["turma_id"],
        having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`),
        // usando comandos sequelize no having!
        // Fica assim: Pedindo para contar, quantas turmas id´s são maiores ou iguais q a lotacao
      });
      return res.status(200).json(fullClasses);
    } catch (error) {
      return res.status(500).send({ error: error });
    }
  }

  static async canceledPerson(req, res) {
    const { estudanteId } = req.params;

    try {
      await pessoasServices.canceledPersonAndMatriculas(estudanteId);
      // database.Sequelize.Transaction(async (transacao) => {
      // acessar duas tabelas e fazer updates
      // await database.Pessoas.update(
      //   { ativo: false },
      //   { where: { id: Number(estudanteId) } },
      //   { transaction: transacao }
      // );

      // await database.Matriculas.update(
      //   { status: "cancelado" },
      //   { where: { estudante_id: Number(estudanteId) } },
      //   { transaction: transacao }
      // );

      return res.status(200).json({
        message: `Matriculas ref. estudante ${estudanteId} canceladas`,
      });
      // });
    } catch (error) {
      return res.status(500).send({ error: error });
    }
  }
}

module.exports = PessoaController;
