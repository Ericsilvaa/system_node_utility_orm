const database = require("../models");

// se conectão c database e processão dados
class Services {
  constructor(nameModel) {
    this.nameModel = nameModel;
  }

  async getAllRegister(where = {}) {
    return database[this.nameModel].findAll({ where: { ...where } });
  }

  async getOneRegister(where) {
    const whereTest = { where: { ...where } };
    console.log("whereTest", whereTest);
    return database[this.nameModel].findOne({ where: { ...where } });
  }

  async createRegister(data) {}

  async updateRegister(updateData, id, transacao = {}) {
    return database[this.nameModel].update(
      updateData,
      { where: id },
      transacao
    );
  }

  async updateRegisters(updateData, where, transacao = {}) {
    return database[this.nameModel].update(
      updateData,
      { where: { ...where } },
      transacao
    );
  }

  // async updateRegisters(updateData, where, transacao = {}) {
  //   return database[this.nameModel].update(
  //     updateData,
  //     { where: { ...where } },
  //     transacao
  //   );
  // }

  async deleteRegister(where) {}

  async findAndCountRegister(where = {}, agregadores) {
    return database[this.nameModel].findAndCountAll({
      where: { ...where },
      ...agregadores,
    });
  }
}

module.exports = Services;
