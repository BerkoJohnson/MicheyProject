import * as express from 'express';
import * as sharp from 'sharp';

import Controller from '../interfaces/controller.interface';
import ResourceNotFoundException from '../exceptions/ResourceNotFoundException';
import CastErrorException from '../exceptions/CastErrorException';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import InvalidRequestException from '../exceptions/InvalidRequestException';
import authMiddleware from '../middleware/auth.middleware';
import validateMiddleware from '../middleware/validation.middleware';
import DuplicateItemException from '../exceptions/DuplicateItemException';
import upload from '../middleware/multer.middleware';
import ProductModel from '../models/product.model';
import { ProductDto, UpdateProductDto } from '../dtos/product.dto';

class ProductController implements Controller {
  public path = '/products';
  public router = express.Router();
  public ProductModel = ProductModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .route(this.path)
      .get(authMiddleware, this.getProducts)
      .post([authMiddleware, validateMiddleware(ProductDto)], this.addProduct);

    this.router
      .route(`${this.path}/:id`)
      .get(authMiddleware, this.getProduct)
      .patch(
        [authMiddleware, validateMiddleware(UpdateProductDto)],
        this.updateProduct
      )
      .delete(authMiddleware, this.deleteProduct);
  }

  private getProducts = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const products = await ProductModel.find();
      return res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  };

  private getProduct = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { id } = req.query;
      if (!id) {
        return next(new InvalidRequestException());
      }

      const product = await ProductModel.findById(id);

      return res.send('this.product is ' + product);
    } catch (error) {
      next(error);
    }
  };

  private addProduct = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const newProduct = new ProductModel(req.body);
      const product = await newProduct.save();
      res.status(201).json(product);
    } catch (error) {
      if (error.name === 'CastError') {
        return next(new CastErrorException('Product', error));
      }
      next(error);
    }
  };

  private updateProduct = async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { id } = req.params;
      const updatedProduct = await ProductModel.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      );
      return res.status(200).json(updatedProduct);
    } catch (error) {
      if (error.name === 'CastError') {
        return next(new CastErrorException('Product', error));
      }
      next(error);
    }
  };

  private deleteProduct = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { id } = req.params;

      if (!id) {
        return next(new InvalidRequestException());
      }

      await ProductModel.findByIdAndDelete(id);

      return res.status(200).send();
    } catch (error) {
      if (error.name === 'CastError') {
        return next(new CastErrorException('Product', error));
      }
      next(error);
    }
  };
}

export default ProductController;
