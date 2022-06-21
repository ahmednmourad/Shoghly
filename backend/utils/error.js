export class CustomError extends Error {
  constructor (statusCode, message) {
    super(message)
    this.statusCode = statusCode
  }
}

export class NotFound extends Error {
  constructor (message) {
    super(message)
    this.statusCode = 404
  }
}
