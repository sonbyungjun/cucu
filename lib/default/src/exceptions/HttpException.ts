class HttpException extends Error {
  public status: number;
  public result: boolean;
  public message: string;

  constructor(status: number, result: boolean, message: string) {
    super(message);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpException);
    }
    this.status = status;
    this.result = result;
    this.message = message;
  }
}

export default HttpException;
