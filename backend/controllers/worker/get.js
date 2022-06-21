import User from "../../services/user.js"

export default async (req, res, next) => {
  const { workerId } = req.params

  try {
    const worker = await User.getById(workerId)

    return res.status(200).json({ message: "data found", data: worker })
  } catch (err) {
    next(err)
  }
}
