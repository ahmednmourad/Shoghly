import pino from "pino"

const logger = pino({
  timestamp: false,
  base: undefined,
  formatters: { level: (label) => { return { level: label.toUpperCase() } } },
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true
    }
  }
})

global.logger = logger

export default logger
