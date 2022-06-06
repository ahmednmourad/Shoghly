import connection from "../../util/mysql.js"

export default async (req, res, next) => {
  const id = req.params.userId
  try {
    const [exist] = await connection.query("SELECT EXISTS(SELECT 1 FROM user WHERE userId = ?) as isExist", [id])
    if (exist[0].isExist === 0) res.status(404).json({ message: "User is not found" })
    const [rows] = await connection.query("SELECT firstName, lastName, phone, picture, role, profession, gender, country, city, line, avg(rating) as rating FROM user LEFT JOIN review ON user.userId = review.workerId WHERE user.userId = ?", [id])
    const user = rows[0]
    console.log(user)
    return res.status(200).json({ message: "User is found", info: user })
  } catch (error) {
    next(error)
  }
}
