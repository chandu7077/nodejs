class UserNotFound extends Error {  
    constructor (message,status = 404) {
      super(message)
      Error.captureStackTrace(this, this.constructor);
  
      this.name = this.constructor.name
      this.status = status;
    }
  
    statusCode() {
      return this.status
    }
}

module.exports = UserNotFound;

