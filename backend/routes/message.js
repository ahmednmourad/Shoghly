import { Router } from "express"

import isAuth from "../middlewares/isAuth.js"
import message from "../controllers/message.js"

const router = Router()

router
  .post("/messages", isAuth, message.send)
  .get("/messages", isAuth, message.list)

export default router
