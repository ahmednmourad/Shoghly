import { CustomError } from "../util/error.js"
export default (req, res) => {
  console.log(req.files)
  const data = req.files.map((file) => {
    return {
      name: file.originalname,
      url: file.location
    }
  })
  if (!data[0]) throw new CustomError(400, "No photo Provided")
  return res.status(200).json({ message: "uploaded successfully", data })
}
