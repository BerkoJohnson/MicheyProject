import { NestInterceptor, ExecutionContext, Injectable, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler
    ): Observable<any> {
        const req = context.switchToHttp().getRequest();
        const method = req.method;
        // const status = context.switchToHttp().getResponse().status();
        const url = req.url;
        const now = Date.now();

        Logger.log(`${method} ${url} ${Date.now() - now}ms`, context.getClass().name);
        return next.handle();
    }
}