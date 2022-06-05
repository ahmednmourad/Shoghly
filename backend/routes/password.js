import { Router } from "express"
import forgotPassword from "../controllers/Password/forgotPassword.js"
import resetPassword from "../controllers/Password/resetPassword.js"
import changePassword from "../controllers/Password/changePassword.js"
import isAuth from "../middleware/isAuth.js"
import verifyEmail from "../controllers/verifyEmail.js"

const router = Router()

router.post("/resetPassword/:token", resetPassword)

router.post("/forgotPassword", forgotPassword)

router.post("/change-password", isAuth, changePassword)

router.post("/verify/email", verifyEmail)

export default router
