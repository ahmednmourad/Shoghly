import { Router } from "express"

import isAuth from "../middlewares/isAuth.js"
import message from "../controllers/message.js"

const router = Router()

router
  .post("/messages", isAuth, message.send)
  .post("/messages/:messageId/acknowledge-read", isAuth, message.acknowledgeRead)
  .get("/users/:userId/messages", isAuth, message.list)

export default router
