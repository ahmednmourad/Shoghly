import { createTransport } from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

/**
 *  Sends an email
 * @param {string} email - The email to send to
 * @param {string} subject - The subject of the email
 * @param {string} text - Email content
 */
const sendEmail = async (email, subject, html) => {
  try {
    const transporter = createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      html
    })

    console.log("email sent successfully")
  } catch (error) {
    console.log(error, "email not sent")
    throw error
  }
}

export default sendEmail
