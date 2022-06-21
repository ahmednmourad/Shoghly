import { Router } from "express"
import isAuth from "../middlewares/isAuth.js"
import isClient from "../middlewares/isClient.js"
import createReview from "../controllers/Review/createReview.js"
import editReview from "../controllers/Review/editReview.js"
import deleteReview from "../controllers/Review/deleteReview.js"
import getReviews from "../controllers/Review/getReviews.js"

const router = Router()

router.post("/workers/:workerId/reviews", isAuth, isClient, createReview)
router.get("/workers/:workerId/reviews", isAuth, getReviews)
router.put("/reviews/:reviewId", isAuth, editReview)
router.delete("/reviews/:reviewId", isAuth, deleteReview)

export default router
