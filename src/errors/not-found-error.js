class NotFoundError extends Error {
    constructor({ message, statusCode }) {
      super(message)
      this.name = 'NotFoundError'
      this.statusCode = statusCode
      Error.captureStackTrace(this, this.constructor)
    }
  }
  
export default NotFoundError