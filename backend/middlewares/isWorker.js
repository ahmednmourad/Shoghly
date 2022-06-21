import dotenv from "dotenv"
dotenv.config()

export default (req, res, next) => {
  const role = req.role
  if (role !== "worker") return res.status(403).json({ message: `Permission denied for user with ${role} role. Only a user with a worker role is allowed to perform this action` })
  next()
}
