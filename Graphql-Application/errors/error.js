class BaseError extends Error {  
    constructor (name,message,status = 404) {
      super(message);
      Error.captureStackTrace(this, this.constructor);
      this.name = name;
      this.status = status;
    }
  
    statusCode() {
      return this.status
    }
}

export default BaseError;

