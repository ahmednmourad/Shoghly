"use strict"

import User from "../../services/user.js"
import { CustomError } from "../../utils/error.js"

export default async (req, res, next) => {
  const city = req.query.city
  const profession = req.query.profession

  try {
    if (!city) throw new CustomError(400, "No city provided")
    if (!profession) throw new CustomError(400, "No profession provided")

    const workers = await User.getAllWorkers({ city, profession })

    return res.status(200).json({ message: "data found", data: workers })
  } catch (err) {
    next(err)
  }
}
