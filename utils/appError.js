class AppErrors extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "Error"
    this.isOperetionalError=true
    Error.captureStackTrace(this,this.constructor)
  }
}
export default AppErrors;
