import { Router } from "express"
import deleteUser from "../controllers/user/delete.js"
import isAuth from "../middleware/isAuth.js"
const router = Router()

router.delete("/user", isAuth, deleteUser)

export default router
