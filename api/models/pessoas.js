"use strict";
module.exports = (sequelize, DataTypes) => {
  const Pessoas = sequelize.define(
    "Pessoas",
    {
      nome: {
        type: DataTypes.STRING,
        validate: {
          fnValidator: function (dado) {
            if (dado.length < 3)
              throw new Error("Name must be more than 3 characters");
          },
        },
      },
      ativo: DataTypes.BOOLEAN,
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: "Email address is invalid",
          },
        },
      },
      role: DataTypes.STRING,
    },
    {
      paranoid: true,
      defaultScope: {
        where: { ativo: true },
      },
      scopes: {
        todos: {
          where: {},
          // etc: {constraint: valor}
        },
      },
    }
  );
  Pessoas.associate = function (models) {
    // quem vai dentro como argumento é: Quem irá "consumir" as informações
    // A tabela Turmas, está "consumindo" algo de Pessoas... Tem ligações => FK
    Pessoas.hasMany(models.Turmas, {
      foreignKey: "docente_id",
    });

    Pessoas.hasMany(models.Matriculas, {
      foreignKey: "estudante_id",
      scope: { status: "confirmado" },
      as: "aulasMatriculadas",
    });

    // behavior default of the ORM: se não passar nada => cria no bando = PessoaId
  };
  return Pessoas;
};
