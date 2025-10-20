import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.getToken();
  
  if (!token) {
    return next(req);
  }

  const headers = new HttpHeaders({
    Authorization: token
  })
  
  const newReq = req.clone({
    headers
  })
  return next(newReq);
};
