import HttpException from "./HttpException";

class DuplicateItemException extends HttpException {
  constructor(model: string) {
    super(400, `This ${model} is already saved`);
  }
}

export default DuplicateItemException;
