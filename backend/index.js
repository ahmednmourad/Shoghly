import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import "./utils/logger.js"
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
import messageRouter from "./routes/message.js"
import chatRouter from "./routes/chat.js"
import errorHandler from "./middlewares/errorHandler.js"

import "./models/user.js"
import "./models/review.js"
import "./models/project.js"
import "./models/picture.js"
import "./models/chat.js"
import "./models/chatParticipants.js"
import "./models/message.js"

import jwt from "jsonwebtoken"
import User from "./services/user.js"

const app = express()
const server = http.createServer(app)
const io = new Server(server)
app.io = io

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
app.use(messageRouter)
app.use(chatRouter)
app.use(errorHandler)

io
  .use((socket, next) => {
    const token = socket.handshake.query.token
    if (!token) next(new Error("No token provided"))
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
      socket.userId = decodedToken.userId
      next()
    } catch (err) {
      next(new Error("Unauthenticated"))
    }
  })
  .on("connection", async (socket) => {
    logger.info(`connected to user: ${socket.userId} on socketId: ${socket.id}`)
    await User.update(socket.userId, { socketId: socket.id })

    // listen for message from user
    socket.on("message", (message) => {
      logger.info("message", message)
    })

    // when server disconnects from user
    socket.on("disconnect", async () => {
      // UPDATE user SET socketId = NULL WHERE userId = socket.userId
      logger.info(`disconnected from user: ${socket.userId}`)
      await User.update(socket.userId, { socketId: null })
    })
  })

sequelize.sync()
  .then(() => logger.info(`${process.env.NODE_ENV} Database is ready`))
  .catch(err => logger.error("Database server is broken", err))

server.listen(8080, () => { logger.info("Listening to port 8080.") })
