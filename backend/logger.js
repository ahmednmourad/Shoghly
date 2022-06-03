import { createLogger, format, transport } from "winston"

const customFormat = format.combine(
  format.timestamp(),
  format.printf((info) => {
    return `${info.timestamp} - [${info.level.toUpperCase()}] - ${info.message}`
  })
)

const logger = createLogger({
  format: customFormat,
  transports: [new transport.Console(), new transport.File({ filename: "app.log", level: "info" })]
})

export default logger
