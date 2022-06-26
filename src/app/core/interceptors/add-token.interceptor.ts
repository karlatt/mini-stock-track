import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENVIRONMENT, Environment } from '../interfaces/environment';

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {
  constructor(@Inject(ENVIRONMENT) private readonly environment: Environment) {}
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let cloneReq = req;
    if (cloneReq.url.startsWith(this.environment.apiUrl)) {//Regex ??
      cloneReq = cloneReq.clone({
        params: req.params.set('token', this.environment.token),
      });
    }
    return next.handle(cloneReq);
  }
}
