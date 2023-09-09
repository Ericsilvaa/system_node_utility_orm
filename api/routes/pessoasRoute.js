const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController");
const MatriculaController = require("../controllers/MatriculaController");

const router = Router();

router.get("/pessoas", PessoaController.getAllPeople);
router.get("/pessoas/active", PessoaController.getAllPeopleActive);
router.get("/pessoas/:id", PessoaController.getPerson);
router.get(
  "/pessoas/:estudanteId/matricula/:matriculaId",
  MatriculaController.getPersonByMatricula
);
router.get("/pessoas/:estudenteId/matricula", PessoaController.getMatricula);
router.get(
  "/pessoas/matricula/:turmaId/confirmadas",
  PessoaController.getMatriculaByTurma
);
router.get("/pessoas/matricula/fullClasses", PessoaController.getFullClasses);
router.post("/pessoas", PessoaController.createPerson);
router.post("/pessoas/:estudanteId/cancela", PessoaController.canceledPerson);
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
