"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Pessoas", "deleteAt", {
      allowNull: true,
      type: Sequelize.DATE,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Pessoas", "deleteAt");
  },
};
