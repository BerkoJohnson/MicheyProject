// import * as dotenv from 'dotenv';
import App from './app/app';
// import validateEnv from './app/utils/validateEnv';
import PostsController from './app/controllers/post.controller';
import AuthenticationController from './app/controllers/authentication.controller';
import UserController from './app/controllers/user.controller';
import PositionController from './app/controllers/position.controller';
import ElectionController from './app/controllers/election.controller';
import CandidateController from './app/controllers/candidate.controller';
import VoterController from './app/controllers/voter.controller';
import { environment } from './environments/environment';

const app = new App(
  [
    new PostsController(),
    new AuthenticationController(),
    new UserController(),
    new PositionController(),
    new ElectionController(),
    new CandidateController(),
    new VoterController()
  ],
  environment.PORT
);

app.listen();
