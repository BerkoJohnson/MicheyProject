import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../interceptors/jwt-interceptors';
import { AuthInterceptor } from '../interceptors/auth-interceptors';
import { ErrorInterceptor } from '../interceptors/error-interceptors';
import { AuthService } from './auth.service';
import { VotingService } from './election.service';

export const providers = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  },
  AuthService,
  VotingService
];
