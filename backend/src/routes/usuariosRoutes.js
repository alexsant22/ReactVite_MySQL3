import { Router } from "express";
import { usuariosController } from "../controllers/usuariosController.js";

const router = Router();

router.get("/", usuariosController.listarUsuarios);
router.get("/:id", usuariosController.buscarUsuario);
router.post("/", usuariosController.criarUsuario);
router.put("/:id", usuariosController.atualizarUsuario);
router.delete("/:id", usuariosController.excluirUsuario);

export default router;
