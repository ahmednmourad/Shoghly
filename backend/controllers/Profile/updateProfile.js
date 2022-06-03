import connection from "../../util/mysql.js"

export default async (req, res, next) => {
  const id = req.userId
  const { firstName, lastName, phone, gender, country, city, line } = req.body

  try {
    await connection.query("UPDATE user set firstName=?, lastName=?, phone=?, gender=?, country=?, city=?, line=? WHERE userId = ?", [firstName, lastName, phone, gender, country, city, line, id])
  } catch (error) {
    next(error)
  }

  return res.status(200).json({ message: "Profile updated successfully" })
}
