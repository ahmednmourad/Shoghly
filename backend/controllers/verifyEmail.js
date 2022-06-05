import connection from "../util/mysql.js"
import { getUserByEmail } from "../util/user.js"
import { CustomError } from "../util/error.js"

export default async (req, res, next) => {
  try {
    const { email, code } = req.body

    const user = await getUserByEmail(email)

    if (user.emailVerified) throw new CustomError(400, "Email already verified")
    if (user.emailConfirmationCode !== code) throw new CustomError(400, "Invalid code")
    if (user.emailCodeExpire < new Date()) throw new CustomError(400, "Confirmation code expired")

    await verifyEmail(email)

    console.log("Email verified successfully!")
    return res.status(200).json({ message: "Email verified successfully" })
  } catch (err) {
    next(err)
  }
}

const verifyEmail = async (email) => {
  await connection.query("UPDATE user SET isConfirmed = true, emailConfirmationCode = NULL, emailCodeExpire = null, emailVerified = true WHERE email = ?", [email])
}
