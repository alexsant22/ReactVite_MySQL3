import { Router } from "express";
import { reservasController } from "../controllers/reservasController.js";

const router = Router();

router.get("/", reservasController.listarReservas);
router.get("/:id", reservasController.buscarReserva);
router.post("/", reservasController.criarReserva);
router.put("/:id", reservasController.atualizarReserva);
router.delete("/:id", reservasController.excluirReserva);

export default router;
