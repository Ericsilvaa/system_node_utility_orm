const express = require("express");
const pessoas = require("./pessoasRoute");
const turmas = require("./turmasRoute");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.send("Welcome");
  });

  app.use(express.json(), pessoas, turmas);
};
