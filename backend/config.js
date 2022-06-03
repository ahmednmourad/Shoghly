import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
console.log(path.resolve(__dirname, `${process.env.NODE_ENV}.env`))

export default dotenv.config({
  path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
})
