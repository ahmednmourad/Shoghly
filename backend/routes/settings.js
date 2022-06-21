import { Router } from "express"

import isAuth from "../middlewares/isAuth.js"
import verifyEmail from "../controllers/settings/verifyEmail.js"
import changePassword from "../controllers/settings/changePassword.js"
import forgotPassword from "../controllers/settings/forgotPassword.js"
import resetPassword from "../controllers/settings/resetPassword.js"

const router = Router()

router
  .post("/settings/verify-email", verifyEmail)
  .post("/settings/change-password", isAuth, changePassword)
  .post("/settings/forgot-password", forgotPassword)
  .post("/settings/reset-password", resetPassword)

export default router
