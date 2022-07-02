import Favorite from "../services/favorite.js"

export const create = async (req, res, next) => {
  const clientId = req.userId
  const { workerId } = req.params

  try {
    await Favorite.create(clientId, workerId)

    return res.status(201).json({ message: `worker ${workerId} added to favorites successfully` })
  } catch (err) {
    next(err)
  }
}

export const list = async (req, res, next) => {
  const clientId = req.userId

  try {
    const favorites = await Favorite.list(clientId)

    return res.status(200).json({ message: "Success", data: favorites })
  } catch (err) {
    next(err)
  }
}

export const remove = async (req, res, next) => {
  const clientId = req.userId
  const { workerId } = req.params

  try {
    const favorites = await Favorite.remove(clientId, workerId)

    return res.status(200).json({ message: `worker ${workerId} removed from favorites successfully`, data: favorites })
  } catch (err) {
    next(err)
  }
}

export default { create, list, remove }
