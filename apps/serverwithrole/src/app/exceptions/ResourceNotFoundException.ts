import HttpException from "./HttpException";

class ResourceNotFoundException extends HttpException {
  constructor(id: string, resource: string) {
    super(404, `${resource} with id ${id} not found`);
  }
}

export default ResourceNotFoundException;
