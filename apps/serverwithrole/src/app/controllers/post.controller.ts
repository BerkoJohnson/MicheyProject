import * as express from "express";
import { Request, Response, NextFunction } from "express";
import Post from "../interfaces/post.interface";
import userModel from "../models/user.model";
import postModel from "../models/post.model";
import Controller from "../interfaces/controller.interface";
import PostNotFoundException from "../exceptions/PostNotFoundException";
import HttpException from "../exceptions/HttpException";
import validateMiddleware from "../middleware/validation.middleware";
import CreatePostDto from "../dtos/post.dto";
import CastErrorException from "../exceptions/CastErrorException";
import authMiddleware from "../middleware/auth.middleware";
import RequestWithUser from "../interfaces/requestWithUser.interface";

class PostsController implements Controller {
  public path = "/posts";
  public router = express.Router();
  public PostModel = postModel;
  public UserModel = userModel;

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getAllPosts);
    this.router.get(`${this.path}/:id`, this.getPostById);

    this.router
      .all(`${this.path}/*`, authMiddleware)
      .patch(
        `${this.path}/:id`,
        validateMiddleware(CreatePostDto),
        this.createPost
      )
      .post(
        this.path,
        authMiddleware,
        validateMiddleware(CreatePostDto),
        this.createPost
      )
      .delete(`${this.path}/:id`, this.deletePost);
  }

  getAllPosts = async (req: Request, res: Response) => {
    const posts = await this.PostModel.find().populate("author", "-password");
    res.status(200).json(posts);
  };

  getPostById = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const post = this.PostModel.findById(id)
      .populate("author", "-passwored")
      .then(post => {
        if (!post) {
          return next(new PostNotFoundException(id));
        }
        res.status(200).json(post);
      })
      .catch((error: HttpException) => {
        if (error.name === "CastError") {
          next(new CastErrorException("Post", error));
        }
      });
  };

  deletePost = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    this.PostModel.findByIdAndDelete(id)
      .then(post => {
        if (!post) {
          return next(new PostNotFoundException(id));
        }

        // Remove post from user's posts array
        this.UserModel.updateOne({ _id: post.author }, {
          $pull: { posts: post._id }
        }).exec();

        res.status(200).json(post);
      })
      .catch((error: HttpException) => {
        if (error.name === "CastError") {
          next(new CastErrorException("Post", error));
        }
      });
  };

  modifyPost = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const postData: Post = req.body;
    this.PostModel.findByIdAndUpdate(id, postData, {
      new: true
    })
      .then(post => {
        if (!post) {
          return next(new PostNotFoundException(id));
        }
        res.json(post);
      })
      .catch((error: HttpException) => {
        if (error.name === "CastError") {
          next(new CastErrorException("Post", error));
        }
      });
  };

  createPost = async (req: RequestWithUser, res: Response) => {
    const postData: CreatePostDto = req.body;
    const createdPost = new this.PostModel({
      ...postData,
      author: [req.user._id]
    });
    const user = await this.UserModel.findById(req.user._id);
    user.posts = [...user.posts, createdPost._id];
    await user.save();
    const savedPost = await createdPost.save();
    await savedPost.populate("author", "-password").execPopulate();
    res.status(201).json(savedPost);
  };
}

export default PostsController;
