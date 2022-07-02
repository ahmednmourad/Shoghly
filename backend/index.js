import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import "./config.js"
import sequelize from "./utils/sequelize.js"
import http from "http"
import { Server } from "socket.io"

import userRouter from "./routes/user.js"
import authenticationRouter from "./routes/authentication.js"
import settingsRouter from "./routes/settings.js"
import workerRouter from "./routes/worker.js"
import projectRouter from "./routes/project.js"
import uploadRouter from "./routes/upload.js"
import reviewRouter from "./routes/review.js"
import searchRouter from "./routes/search.js"
import favoriteRouter from "./routes/favorite.js"
import errorHandler from "./middlewares/errorHandler.js"

import "./models/user.js"
import "./models/review.js"
import "./models/project.js"
import "./models/picture.js"

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(bodyParser.json())
app.use(cors({ credentials: true, origin: "*" }))

app.use(userRouter)
app.use(workerRouter)
app.use(reviewRouter)
app.use(authenticationRouter)
app.use(uploadRouter)
app.use(projectRouter)
app.use(searchRouter)
app.use(settingsRouter)
app.use(favoriteRouter)
app.use(errorHandler)

io.on("connection", (socket) => {
  // Update socketId to socket.id in the database
  // UPDATE user SET socketId = ? WHERE userId = ?

  // listen for message from user
  socket.on("message", (message) => {
    console.log("message", message)
  })

  // when server disconnects from user
  socket.on("disconnect", () => {
    // Update socketId to null in the database
    // UPDATE user SET socketId = NULL WHERE userId = ?
    console.log("disconnected from user")
  })
})

sequelize.sync()
  .then(() => console.log(`${process.env.NODE_ENV} Database is ready`))
  .catch(err => console.error("Database server is broken", err))

server.listen(8080, () => { console.log("Listening to port 8080.") })
