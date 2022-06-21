import express from "express"
import cors from "cors"
import "./config.js"
import sequelize from "./util/sequelize.js"

import userRouter from "./routes/user.js"
import workerRouter from "./routes/worker.js"
import authenticationRouter from "./routes/authentication.js"
import passwordRouter from "./routes/password.js"
import profileRouter from "./routes/profile.js"
import projectRouter from "./routes/project.js"
import uploadRouter from "./routes/upload.js"
import reviewRouter from "./routes/review.js"
import searchRouter from "./routes/search.js"

import bodyParser from "body-parser"
import errorHandler from "./middlewares/errorHandler.js"

import "./models/user.js"
import "./models/review.js"
import "./models/project.js"
import "./models/picture.js"

const app = express()

app.use(bodyParser.json())
app.use(cors({ credentials: true, origin: "*" }))

app.use(userRouter)
app.use(workerRouter)
app.use(authenticationRouter)
app.use(passwordRouter)
app.use(uploadRouter)
app.use(profileRouter)
app.use(projectRouter)
app.use(reviewRouter)
app.use(searchRouter)
app.use(errorHandler)

app.listen(8080, () => { console.log("Listening to port 8080.") })

sequelize.sync()
  .then(() => console.log(`${process.env.NODE_ENV} Database is ready`))
  .catch(err => console.error("Database server is broken", err))
