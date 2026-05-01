import { Router } from "express";
import { validateBody } from "../middlewares/validate.ts";
import { LoginSchema, RegisterSchema } from "../schemas/auth.ts";
import { register, login, logout } from "../controllers/auth.ts";

const router = Router();

router.post("/register", validateBody(RegisterSchema), register);
router.post("/login", validateBody(LoginSchema), login);
router.post("/logout", logout);

export default router;
