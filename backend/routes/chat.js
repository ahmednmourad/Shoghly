import { Router } from "express"

import isAuth from "../middlewares/isAuth.js"
import chat from "../controllers/chat.js"

const router = Router()

router
  .get("/chats", isAuth, chat.list)

export default router
