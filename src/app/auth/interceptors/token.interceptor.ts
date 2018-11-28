
import {switchMap, take} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';



import {Store} from '@ngrx/store';

import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../store/auth.reducers';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromApp.AppState>) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(take(1),switchMap((authState: fromAuth.State) => {
      if (authState.token !== null) {
        const copiedRequest = request.clone({
          setHeaders: {
            "Authorization": `Token ${authState.token}`
          }
        });
        return next.handle(copiedRequest);
      }
      return next.handle(request);
    }),);
  }
}
