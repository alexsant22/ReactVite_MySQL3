import { Router } from "express";
import { salasController } from "../controllers/salasController.js";

const router = Router();

router.get("/", salasController.listarSalas);
router.get("/:id", salasController.buscarSala);
router.post("/", salasController.criarSala);
router.put("/:id", salasController.atualizarSala);
router.delete("/:id", salasController.excluirSala);

export default router;
