const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController");

const router = Router();

router.get("/pessoas", PessoaController.getAllPeopleActive);
router.get("/pessoas/all", PessoaController.getAllPeople);
router.get("/pessoas/:id", PessoaController.getPerson);
router.get(
  "/pessoas/:estudanteId/matricula/:matriculaId",
  PessoaController.getPersonByMatricula
);
router.get("/pessoas/:estudenteId/matricula", PessoaController.getMatricula);
router.post("/pessoas", PessoaController.createPerson);
router.put("/pessoas/:id", PessoaController.updatePerson);
router.post(
  "/pessoas/:estudanteId/matricula",
  PessoaController.createMatricula
);
router.post("/pessoas/:id/restaura", PessoaController.restorePersonRemoved);
router.put(
  "/pessoas/:estudanteId/matricula/:matriculaId",
  PessoaController.updateMatricula
);
router.delete("/pessoas/:id", PessoaController.deletePerson);
router.delete(
  "/pessoas/:estudanteId/matricula/:matriculaId",
  PessoaController.deleteMatricula
);

module.exports = router;
