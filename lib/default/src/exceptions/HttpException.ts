class HttpException extends Error {
  public status: number;
  public message: string;

  constructor(status: number, message: string) {
    super(message);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpException);
    }
    this.status = status;
    this.message = message;
  }
}

export default HttpException;
