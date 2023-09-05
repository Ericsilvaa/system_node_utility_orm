const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController");

const router = Router();

router.get("/pessoas", PessoaController.getAllPeople);
router.get("/pessoas/:id", PessoaController.getPerson);
router.post("/pessoas", PessoaController.createPerson);
router.put("/pessoas/:id", PessoaController.updatePerson);
router.delete("/pessoas/:id", PessoaController.deletePerson);
router.get(
  "/pessoas/:estudanteId/matricula/:matriculaId",
  PessoaController.getPersonByMatricula
);
router.post(
  "/pessoas/:estudanteId/matricula",
  PessoaController.createMatricula
);
router.put(
  "/pessoas/:estudanteId/matricula/:matriculaId",
  PessoaController.updateMatricula
);
router.delete(
  "/pessoas/:estudanteId/matricula/:matriculaId",
  PessoaController.deleteMatricula
);

module.exports = router;