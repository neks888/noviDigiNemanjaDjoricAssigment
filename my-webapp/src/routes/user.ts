import { Router } from "express";
import { registerUser, getUser } from "../controllers/userController";
import auth from "../middleware/auth";

const router = Router();

router.post("/register", registerUser);
router.get(`/:id`, auth, getUser);

export default router;
