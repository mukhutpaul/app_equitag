import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { GlobalConstants } from '../shared/global-constants';
import { AuthService } from './auth.service';
import { SnackbarService } from './snackbar.service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(public auth:AuthService,
    public router:Router,
    private snackbarService:SnackbarService) { }

    canActivate(route:ActivatedRouteSnapshot): boolean{
      let expectedRoleArray:any = route.data;
      expectedRoleArray = expectedRoleArray.expectedRole;
      const token:any = localStorage.getItem('token');
      var tokenPayload: any;
      try{
        tokenPayload = jwt_decode(token);
      }
      catch(err){
        localStorage.clear();
        this.router.navigate(['/']);
      }

      let checkRole = false;
      for( let i= 0; i<expectedRoleArray.length; i++){
            if(expectedRoleArray[i] == tokenPayload.is_superuser){
              checkRole = true;
            }
      }

      if(tokenPayload.is_superuser == 0 || tokenPayload.is_superuser == 1){
         if(this.auth.isAuthenticated() && checkRole){
          return true;
          
         }
         else{
          this.snackbarService.openSnackBar(GlobalConstants.unauthroized,GlobalConstants.error);
          this.router.navigate(['/darshboard']);
          return false;   
        }
      }
      else{
        this.router.navigate(['/']);
        localStorage.clear();
        return false;
      }
    }
}
