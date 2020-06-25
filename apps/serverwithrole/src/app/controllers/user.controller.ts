import * as express from "express";
import postModel from "../models/post.model";
import Controller from "../interfaces/controller.interface";
import authMiddleware from "../middleware/auth.middleware";
import RequestWithUser from "../interfaces/requestWithUser.interface";
import NotAuthorizedException from "../exceptions/NotAuthorizedException";

class UserController implements Controller {
  public path = "/users";
  public router = express.Router();
  public PostModel = postModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/:id/posts`,
      authMiddleware,
      this.getAllUserOfPosts
    );
  }

  private getAllUserOfPosts = async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const userID = req.params.id;
    if (userID === req.user._id.toString()) {
      const posts = await this.PostModel.find({ author: userID });
      return res.json(posts);
    }
    next(new NotAuthorizedException());
  };
}

export default UserController;
