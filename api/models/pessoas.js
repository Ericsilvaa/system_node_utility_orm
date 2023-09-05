"use strict";
module.exports = (sequelize, DataTypes) => {
  const Pessoas = sequelize.define(
    "Pessoas",
    {
      nome: DataTypes.STRING,
      ativo: DataTypes.BOOLEAN,
      email: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {}
  );
  Pessoas.associate = function (models) {
    // quem vai dentro como argumento é: Quem irá "consumir" as informações
    // A tabela Turmas, está "consumindo" algo de Pessoas... Tem ligações => FK
    Pessoas.hasMany(models.Turmas, {
      foreignKey: "docente_id",
    });

    Pessoas.hasMany(models.Matriculas, {
      foreignKey: "estudante_id",
    });

    // behavior default of the ORM: se não passar nada => cria no bando = PessoaId
  };
  return Pessoas;
};
