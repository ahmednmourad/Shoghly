import connection from "../../util/mysql.js"
import { v4 as uuidv4 } from "uuid"
import { encryptPassword } from "../../util/passwords.js"
import { CustomError } from "../../util/error.js"
import sendEmail from "../../util/sendEmail.js"

export default async (req, res, next) => {
  console.log(req.body)
  const { firstName, lastName, email, country, city, password, phone, picture, line, role, profession, gender } = req.body
  const userId = uuidv4()

  try {
    if (!password) throw new CustomError(400, "Password not provided")
    const encryptedPassword = await encryptPassword(password)
    const emailConfirmationCode = generateRandomCode()
    const emailCodeExpire = new Date(new Date().setHours(new Date().getHours() + 24))
    console.log(emailConfirmationCode, emailCodeExpire)

    const user = {
      userId,
      password: encryptedPassword,
      firstName,
      lastName,
      role,
      email,
      country,
      city,
      phone,
      gender,
      line,
      picture,
      profession,
      emailConfirmationCode,
      emailCodeExpire
    }
    await connection.query("INSERT INTO user set ?", user)
    const html = `<h1>Your Verification Code</h1>
    <h4>Enter this verification code:</h4>
    <h2 style="letter-spacing: 20px"><b>${emailConfirmationCode}<b></h2>
    <h4>Verification code is valid only for 24 hours</h4>`

    try {
      await sendEmail(email, "Shoghly Email Verification", html)
    } catch (err) {
      console.log("Failed sending email", err)
    }
    return res.status(201).json({ message: "User created", id: userId })
  } catch (err) {
    next(err)
  }
}

const generateRandomCode = () => {
  return Math.floor(100000 + Math.random() * 900000)
}
