import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer"
import multerS3 from "multer-s3"
import { v4 as uuidv4 } from "uuid"
import dotenv from "dotenv"

dotenv.config()

const s3 = new S3Client();
const MAXIMUM_NUMBER_OF_FILES = 25

export default (req, res, next) => {
  const upload = multer({
    storage: multerS3({
      s3,
      bucket: process.env.S3_BUCKET_NAME,
      acl: "public-read",
      key: (req, file, cb) => {
        const extArray = file.mimetype.split("/")
        const extension = extArray[extArray.length - 1]
        const fileName = `${uuidv4()}.${extension}`
        cb(null, fileName)
      }
    })
  }).array("photos", MAXIMUM_NUMBER_OF_FILES)

  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) return res.status(400).json({ message: "Upload unsuccessful", err })
    if (err) return res.status(500).json({ message: "Something went wrong", err })
    next()
  })
}
