import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export default (req, res, next) => {
  const authHeader = req.get("Authorization")
  if (!authHeader) return res.status(401).json({ message: "Not authenticated, No authorization header" })
  const token = authHeader.split(" ")[1]

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
    if (!decodedToken) return res.status(401).json({ message: "Not authenticated, No authorization header" })
    req.userId = decodedToken.userId
  } catch (err) {
    console.log(err.stack)
    return res.status(500).json({ message: "Something went wrong" })
  }

  next()
}
