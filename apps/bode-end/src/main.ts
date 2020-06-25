// import * as dotenv from 'dotenv';
import App from './app/app';
// import validateEnv from './app/utils/validateEnv';
import AuthenticationController from './app/controllers/authentication.controller';
import UserController from './app/controllers/user.controller';

import { environment } from './environments/environment';
import ProductController from './app/controllers/product.controller';

const app = new App(
  [,
    new AuthenticationController(),
    new UserController(),
    new ProductController(),
  ],
  environment.PORT
);

app.listen();
