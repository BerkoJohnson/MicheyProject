import HttpException from "./HttpException";

class InvalidRequestException extends HttpException {
  constructor() {
    super(400, `Invalid Request`);
  }
}

export default InvalidRequestException;
