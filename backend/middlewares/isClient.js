import dotenv from "dotenv"
dotenv.config()

export default (req, res, next) => {
  const role = req.role
  if (role !== "client") return res.status(403).json({ message: `Permission denied for ${role} role. Only client role is allowed to perform this action` })
  next()
}
