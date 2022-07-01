import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';
// import { AuthService } from './main/pages/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {


  constructor(
    private router: Router,
    private _matSnackBar: MatSnackBar,
    // private _authService: AuthService,
    private _router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | any {
    const userToken = localStorage.getItem('userToken')

    if (!userToken) {
      this.router.navigate(['/auth/login'])
      return false
    } else {
      return true
    }
  }
}


