import dotenv from "dotenv"
dotenv.config()

export default (req, res, next) => {
  const userRole = req.userRole
  if (userRole !== "client") return res.status(403).json({ message: "Permission denied" })
  next()
}
