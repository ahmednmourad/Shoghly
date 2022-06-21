import SibApiV3Sdk from "sib-api-v3-sdk"
const defaultClient = SibApiV3Sdk.ApiClient.instance
const apiKey = defaultClient.authentications["api-key"]
apiKey.apiKey = process.env.SENDINBLUE_API_KEY
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()
let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail()

/**
 *  Sends an email
 * @param {string} email - The email to send to
 * @param {string} subject - The subject of the email
 * @param {string} text - Email content
 */
const sendEmail = async (email, subject, html) => {
  sendSmtpEmail = {
    sender: { email: "7erafieenproject@gmail.com", name: "Shoghly" },
    to: [{ email }],
    subject,
    htmlContent: html
  }
  await apiInstance.sendTransacEmail(sendSmtpEmail)
  console.log(`Email sent to ${email} successfully`)
}

export default sendEmail
