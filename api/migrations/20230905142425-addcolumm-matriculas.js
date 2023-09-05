"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Matriculas", "deleteAt", {
      allowNull: true,
      type: Sequelize.DATE,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Matriculas", "deleteAt");
  },
};
