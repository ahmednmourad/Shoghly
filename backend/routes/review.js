import { Router } from "express"
import isAuth from "../middlewares/isAuth.js"
import isClient from "../middlewares/isClient.js"

import createReview from "../controllers/review/create.js"
import updateReview from "../controllers/Review/update.js"
import deleteReview from "../controllers/Review/delete.js"
import listReviews from "../controllers/Review/list.js"

const router = Router()

router
  .post("/workers/:workerId/reviews", isAuth, isClient, createReview)
  .get("/workers/:workerId/reviews", isAuth, listReviews)
  .put("/workers/reviews/:reviewId", isAuth, updateReview)
  .delete("/workers/reviews/:reviewId", isAuth, deleteReview)

export default router
