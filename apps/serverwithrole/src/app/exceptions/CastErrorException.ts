import HttpException from "./HttpException";
import * as mongoose from "mongoose";

class CastErrorException extends HttpException {
    constructor(model: string, error: HttpException) {
    super(400, `${model} not found with ${error['value']}`);
  }
}

export default CastErrorException;
