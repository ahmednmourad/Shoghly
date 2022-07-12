"use strict"

import User from "../models/user.js"
import Review from "../models/review.js"
import { CustomError } from "../utils/error.js"
import sequelize from "../utils/sequelize.js"

export const create = async (user) => {
  return await User.create(user)
}

export const getById = async (id) => {
  const user = await User.findByPk(id, {
    attributes: [["userId", "id"], "firstName", "lastName", "phone", "picture", "role", "profession", "gender", "country", "city", "line", "emailVerified"],
    raw: true
  })
  if (!user) throw new CustomError(404, "User not found")
  if (user.role === "worker") {
    const reviews = await Review.findAll({
      include: {
        model: User,
        as: "client",
        attributes: [["userId", "id"], "firstName", "lastName", "picture", "gender"],
        orderBy: [
          [
            { model: Review, as: "client" },
            "updatedAt",
            "DESC"
          ]
        ]
      },
      attributes: {
        exclude: ["workerId", "clientId"]
      },
      where: { workerId: id }
    })
    // Count & Average would change to a query if we had pagination in place
    const reviewsCount = reviews.length
    const reviewsAverage = reviews.reduce((previous, current) => previous + current.rating, 0) / reviewsCount
    return { ...user, reviews, reviewsCount, reviewsAverage }
  }
  return user
}

export const getSocketId = async (id) => {
  const user = await User.findByPk(id, { attributes: ["socketId"], raw: true })
  if (!user) throw new CustomError(404, "User not found")

  logger.info("SocketId", user.socketId)
  return user.socketId
}

export const getByEmail = async (email) => {
  const user = await User.findOne({ where: { email } })
  if (!user) throw new CustomError(404, "User not found")
  return user
}

export const getAllWorkers = async (filters) => {
  const { count, rows } = await User.findAndCountAll({
    where: { role: "worker", ...filters },
    attributes: [
      ["userId", "id"], "firstName", "lastName", "phone", "picture", "role", "profession", "gender", "country", "city", "line",
      [sequelize.literal("(SELECT AVG(rating) FROM review WHERE review.workerId = user.userId)"), "averageRating"]
    ]
  })
  return { workers: rows, count }
}

export const update = async (id, user) => {
  const result = await User.update(user, { where: { userId: id } })
  if (!result) throw new CustomError("User not found")
}

export const changePassword = async (id, password) => {
  logger.info(id, password)
  const result = await User.update({ password }, { where: { userId: id } })
  if (!result) throw new CustomError("User not found")
}

export const remove = async (id) => {
  const result = await User.destroy({ where: { userId: id } })
  if (!result) throw new CustomError("User not found")
}

const verifyEmail = async (email) => {
  await User.update({ isConfirmed: true, emailConfirmationCode: null, emailCodeExpire: null, emailVerified: true }, { where: { email } })
}

export default { create, getById, getByEmail, update, changePassword, remove, verifyEmail, getAllWorkers, getSocketId }
