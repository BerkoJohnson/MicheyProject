import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.retrieveToken();
    // If token exists 
    if (token) {
      const clonedReq = request.clone({
        headers: request.headers.set("Authorization", token)
      })

      return next.handle(clonedReq);
    }

    return next.handle(request);
  }
}
