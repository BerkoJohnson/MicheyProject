import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  JwtInterceptor,
  AuthInterceptor,
  ErrorInterceptor
} from './interceptors';
import {
  ElectionService,
  PositionService,
  AuthService,
  CandidateService,
  DialogService,
  VoterService
} from './services';
import { ElectionSelectedGuard } from './guards/election-selected.guard';

export const PROVIDERS = [
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
  ElectionService,
  PositionService,
  AuthService,
  CandidateService,
  VoterService,
  ElectionSelectedGuard,
  DialogService
];
