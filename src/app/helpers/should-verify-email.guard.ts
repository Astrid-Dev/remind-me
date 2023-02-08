import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ShouldVerifyEmailGuard implements CanActivate{
  constructor(private authState: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot):Promise<boolean> {
    return new Promise((resolve, reject) => {
      console.log(this.authState.userData);
      if(this.authState.isEmailVerified === null){
        this.router.navigate(['/welcome']);
      }
      else if(this.authState.isEmailVerified){
        this.router.navigate(['/app/reminders']);
      }

      resolve(this.authState.isEmailVerified === false);
    });
  }
}
