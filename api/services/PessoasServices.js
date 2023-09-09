const Services = require("./Services");
const database = require("../models");

class PessoasServices extends Services {
  constructor() {
    super("Pessoas");
    this.matriculas = new Services("Matriculas");
  }

  // create specifics methods of the people controller

  async getRegisterActive(where = {}) {
    return database[this.nameModel].findAll({ where: { ...where } });
  }

  async getAllRegister(where = {}) {
    return database[this.nameModel]
      .scope("todos")
      .findAll({ where: { ...where } });
  }

  async canceledPersonAndMatriculas(estudanteId) {
    return database.Sequelize.Transaction(async (transacao) => {
      await super.updateRegister({ ativo: false }, estudanteId, {
        transction: transacao,
      });

      await this.matriculas.updateRegisters(
        { status: "cancelado" },
        { estudante_id: estudanteId },
        {
          transction: transacao,
        }
      );
    });
  }
}

module.exports = PessoasServices;
