import { Router } from "express";
import salasRoutes from "./salasRoutes.js";
import usuariosRoutes from "./usuariosRoutes.js";
import reservasRoutes from "./reservasRoutes.js";

const router = Router();

router.use("/salas", salasRoutes);
router.use("/usuarios", usuariosRoutes);
router.use("/reservas", reservasRoutes);

export default router;
