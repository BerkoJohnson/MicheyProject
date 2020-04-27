import * as express from 'express';
import * as mongoose from 'mongoose';
import Controller from './interfaces/controller.interface';
import errorMiddleware from './middleware/error.middleware';
import * as colors from 'colors';
import * as cookieParser from 'cookie-parser';
import { environment } from '../environments/environment';

class App {
  public app: express.Application;
  public port: number;

  constructor(controllers: Controller[], port) {
    this.app = express();
    this.port = environment.PORT;

    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(require('morgan')('dev'));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach(controller => {
      this.app.use('/api/v1', controller.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(
        colors.black.bold('->'),
        colors.yellow.bold('[Bootstrapping]'),
        colors.green.bold(
          `Api running on  http://localhost:${this.port}/api/v1/`
        )
      );
    });
  }

  private connectToTheDatabase() {
    // const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH, MONGO_URI } = process.env;

    mongoose.connect(environment.MONGO_URI, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  }
}

export default App;
