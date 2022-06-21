import { compare, hash } from "bcrypt"

const comparePassword = async (password, userPassword) => await compare(password, userPassword)

const encryptPassword = async password => await hash(password, 10)

export { comparePassword, encryptPassword }
