import { Router } from "express"
import isAuth from "../middlewares/isAuth.js"
import isClient from "../middlewares/isClient.js"

import createReview from "../controllers/review/create.js"
import updateReview from "../controllers/review/update.js"
import deleteReview from "../controllers/review/delete.js"
import listReviews from "../controllers/review/list.js"

const router = Router()

router
  .post("/workers/:workerId/reviews", isAuth, isClient, createReview)
  .get("/workers/:workerId/reviews", listReviews)
  .put("/workers/reviews/:reviewId", isAuth, updateReview)
  .delete("/workers/reviews/:reviewId", isAuth, deleteReview)

export default router
