
"use strict"

import Favorite from "../models/favorite.js"
import Review from "../models/review.js"
import User from "../models/user.js"
import { CustomError } from "../utils/error.js"
import sequelize from "../utils/sequelize.js"

export const create = async (clientId, workerId) => {
  await Favorite.create({ clientId, workerId })
}

export const list = async (clientId) => {
  return await sequelize.query("SELECT favorite.createdAt, JSON_OBJECT('firstName',firstName,'lastName', lastName, 'picture', picture, 'gender', gender, 'profession', profession, 'averageRating', (SELECT AVG(rating) FROM review WHERE review.workerId = user.userId)) AS worker FROM favorite INNER JOIN user ON user.userId = favorite.workerId WHERE clientId = ?",
    { type: sequelize.QueryTypes.SELECT, raw: true, replacements: [clientId] }
  )
}

export const remove = async (clientId, workerId) => {
  const count = await Favorite.destroy({ where: { clientId, workerId } })
  if (count === 0) throw new CustomError(404, "Favorite not found")
}

export default { create, list, remove }
