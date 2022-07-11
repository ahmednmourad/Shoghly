import pino from "pino"

const logger = pino({
  timestamp: pino.stdTimeFunctions.isoTime,
  base: undefined,
  formatters: { level: (label) => { return { level: label.toUpperCase() } } },
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true
    }
  },
  hooks: {
    logMethod (inputArgs, method, level) {
      if (inputArgs.length >= 2) {
        const arg1 = inputArgs.shift()
        const arg2 = inputArgs.shift()
        return method.apply(this, [arg2, arg1, ...inputArgs])
      }
      return method.apply(this, inputArgs)
    }
  }
})

global.logger = logger

export default logger
