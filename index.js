import express from "express"
import cors from "cors"
import config from "./config.js"
import sequelize from "./util/sequelize.js"
import authentication from "./routes/authentication.js"
import profile from "./routes/profile.js"
import project from "./routes/project.js"
import upload from "./routes/upload.js"
import review from "./routes/review.js"
import workers from "./routes/workers.js"
import search from "./routes/search.js"
import bodyParser from "body-parser"
import errorHandler from "./middleware/errorHandler.js"

import user from "./models/user.js"
import rev from "./models/review.js"
import pro from "./models/project.js"
import pic from "./models/picture.js"

const app = express()

app.use(bodyParser.json())
app.use(cors({ credentials: true, origin: "*" }))

app.use(authentication)
app.use(upload)
app.use(profile)
app.use(project)
app.use(review)
app.use(workers)
app.use(search)

app.use(errorHandler)

app.listen(8080, () => { console.log("Listening to port 8080.") })

sequelize.sync()
  .then(() => console.log(`${process.env.NODE_ENV} Database is ready`))
  .catch(err => console.error("Database server is broken", err))
