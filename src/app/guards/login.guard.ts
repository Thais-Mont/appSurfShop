// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';
// import { AuthService } from './../services/auth.service';
// // eslint-disable-next-line @typescript-eslint/quotes
// import { getAuth, onAuthStateChanged } from "@angular/fire/auth";

// @Injectable({
//   providedIn: 'root'
// })
// export class LoginGuard implements CanActivate {
//   auth = getAuth();
//   authService: any;
//   router: any;
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//       return  new Promise<boolean>((resolve) => {
//         this.authService.getAuth().onAuthStateChanged(user => {
//           if (user) {this.router.navigate(['/home']);}

//           resolve(!user ? true : false);
//     });
//   });
//   }
// }
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      this.authService.getAuth().onAuthStateChanged(user => {
        if (user) {this.router.navigate(['home']);}

        resolve(!user ? true : false);
      });
    });
  }
}
