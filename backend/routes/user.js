import { Router } from "express"

import isAuth from "../middlewares/isAuth.js"
import getUser from "../controllers/user/get.js"
import updateUser from "../controllers/user/update.js"
import createUser from "../controllers/user/create.js"
import deleteUser from "../controllers/user/delete.js"

const router = Router()

router
  .post("/users", createUser)
  .get("/users", isAuth, getUser)
  .put("/users", isAuth, updateUser)
  .delete("/users", isAuth, deleteUser)

export default router
