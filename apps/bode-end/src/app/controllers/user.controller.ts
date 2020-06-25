import * as express from "express";
import Controller from "../interfaces/controller.interface";
import authMiddleware from "../middleware/auth.middleware";
import RequestWithUser from "../interfaces/requestWithUser.interface";
import NotAuthorizedException from "../exceptions/NotAuthorizedException";

class UserController implements Controller {
  public path = "/users";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // this.router.get(
    //   `${this.path}/:id/posts`,
    //   authMiddleware,
    //   this.getAllUserOfPosts
    // );
  }

  
}

export default UserController;
