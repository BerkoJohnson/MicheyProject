import App from './app';
import AuthenticationController from './app/controllers/authentication.controller';
import UserController from './app/controllers/user.controller';
import { environment } from './environments/environment';

const app = new App(
  [
    new AuthenticationController(),
    new UserController(),
  ],
  environment.PORT
);

app.listen();
