"use strict"

import User from "../models/user.js"
import Review from "../models/review.js"
import { CustomError } from "../util/error.js"

export const create = async (user) => {
  return await User.create(user)
}

export const getById = async (id) => {
  const user = await User.findByPk(id, { attributes: [["userId", "id"], "firstName", "lastName", "phone", "picture", "role", "profession", "gender", "country", "city", "line"] })
  if (!user) throw new CustomError(404, "User not found")
  if (user.role === "worker") {
    const { count, rows } = await Review.findAndCountAll({ where: { workerId: id }, attributes: { exclude: ["workerId"] } })
    return { ...user.dataValues, reviews: rows, reviewsCount: count }
  }
  return user
}

export const getByEmail = async (email) => {
  const user = await User.findOne({ where: { email } })
  if (!user) throw new CustomError(404, "User not found")
  return user
}

export const update = async (id, user) => {
  const result = await User.update(user, { where: { userId: id } })
  if (!result) throw new CustomError("User not found")
}

export const changePassword = async (id, password) => {
  const result = await User.update({ password }, { where: { userId: id } })
  if (!result) throw new CustomError("User not found")
}

export const remove = async (id) => {
  const result = await User.destroy({ where: { userId: id } })
  if (!result) throw new CustomError("User not found")
}

export default { create, getById, getByEmail, update, changePassword, remove }
