const express = require("express");
const pessoas = require("./pessoasRoute");

module.exports = (app) => {
  app.use(express.json());

  app.get("/", (req, res) => {
    res.send("Welcome");
  });

  app.use(pessoas);
};
