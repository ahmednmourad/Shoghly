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
    const html = `
    <div class="c-email">  
      <div class="c-email__header">
        <h1 class="c-email__header__title">Your Verification Code</h1>
      </div>
      <div class="c-email__content">
        <p class="c-email__content__text text-title">
          Enter this verification code in field:
        </p>
        <div class="c-email__code">
          <span class="c-email__code__text">${emailConfirmationCode}</span>
        </div>
        <p class="c-email__content__text text-italic opacity-30 text-title mb-0">Verification code is valid only for 24 hours</p>
      </div>
      <div class="c-email__footer"></div>
    </div>
    `
    await sendEmail(email, "Shoghly Email Verification", html)
    return res.status(201).json({ message: "User created", id: userId })
  } catch (err) {
    next(err)
  }
}

const generateRandomCode = () => {
  return Math.floor(100000 + Math.random() * 900000)
}
