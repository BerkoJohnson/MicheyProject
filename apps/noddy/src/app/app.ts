import * as express from 'express';
import * as mongoose from 'mongoose';
import Controller from './interfaces/controller.interface';
import errorMiddleware from './middleware/error.middleware';
import * as colors from 'colors';
import * as cookieParser from 'cookie-parser';
import { environment } from '../environments/environment';
import { createServer, Server } from 'http';
import * as socketIO from 'socket.io';

class App {
  public app: express.Application;
  public server: Server;
  public io: socketIO.Server;
  public port: number;

  constructor(controllers: Controller[], port: number) {
    this.app = express();
    this.server = createServer(this.app);
    this.io = socketIO(this.server);
    this.port = port;

    this.connectIO();
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
    this.app.use(require('cors')());
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
    this.server.listen(this.port, () => {
      console.log(
        colors.black.bold('->'),
        colors.yellow.bold('[Bootstrapping]'),
        colors.green.bold(
          `NoddyAPI running on http://localhost:${this.port}/api/v1/`
        )
      );
    });
  }

  private connectToTheDatabase() {
    mongoose.connect(environment.MONGO_URI, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  }

  private connectIO() {
    this.io.on('connection', socket => {
      console.log('User connected');
      this.io.emit('results', { election: 123 });

      socket.on('disconnect', () => {
        console.log('User disconnected');
      });

      socket.on('vote this', data => {
        //
        console.log(data);
        this.io.emit('results', { election: 123 });
      });
    });
  }
}

export default App;
