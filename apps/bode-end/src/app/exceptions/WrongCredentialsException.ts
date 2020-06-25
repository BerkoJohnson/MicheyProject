import HttpException from "./HttpException";

class WrongCredentialsException extends HttpException {
  constructor() {
    super(401, `Incorrect email or password`);
  }
}

export default WrongCredentialsException;
