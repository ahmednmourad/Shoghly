
"use strict"

import Review from "../models/review.js"
import { CustomError } from "../utils/error.js"

export const create = async (review) => {
  await Review.create(review)
}

export const list = async (workerId) => {
  const { count, rows } = await Review.findAndCountAll({ where: { workerId } })
  return { reviews: rows, count }
}

export const update = async (reviewId, clientId, review) => {
  const [count] = await Review.update(review, { where: { reviewId, clientId } })
  if (count === 0) throw new CustomError(404, "Review not found")
}

export const remove = async (reviewId, clientId) => {
  const count = await Review.destroy({ where: { reviewId, clientId } })
  console.log(count)
  if (count === 0) throw new CustomError(404, "Review not found")
}

export default {create, list, update, remove }