import HttpException from "./HttpException";

class NotAuthorizedException extends HttpException {
  constructor() {
    super(401, "Wrong authentication token");
  }
}

export default NotAuthorizedException;
