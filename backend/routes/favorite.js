import { Router } from "express"

import isAuth from "../middlewares/isAuth.js"
import favorite from "../controllers/favorite.js"

const router = Router()

router
  .post("/favorites/workers/:workerId", isAuth, favorite.create)
  .get("/favorites", isAuth, favorite.list)
  .delete("/favorites/workers/:workerId", isAuth, favorite.remove)

export default router
