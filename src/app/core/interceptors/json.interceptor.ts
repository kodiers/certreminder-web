import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class JsonInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const copiedRequest = request.clone({
      setHeaders: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      }
      });
    return next.handle(copiedRequest);
    }
}
