
"use strict"

import Favorite from "../models/favorite.js"
import User from "../models/user.js"
import { CustomError } from "../utils/error.js"

export const create = async (clientId, workerId) => {
  await Favorite.create({ clientId, workerId })
}

export const list = async (clientId) => {
  return await Favorite.findAll({
    include: {
      model: User,
      as: "worker",
      attributes: [["userId", "id"], "firstName", "lastName", "picture", "gender"]
    },
    where: { clientId },
    attributes: ["createdAt"]
  })
}

export const remove = async (clientId, workerId) => {
  const count = await Favorite.destroy({ where: { clientId, workerId } })
  if (count === 0) throw new CustomError(404, "Favorite not found")
}

export default { create, list, remove }
