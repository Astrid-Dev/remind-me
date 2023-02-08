import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ShouldBeSignedOutGuard implements CanActivate{
  constructor(private authState: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot):Promise<boolean> {
    return new Promise((resolve, reject) => {
      console.log(this.authState.userData);
      if(this.authState.isLoggedIn){
        this.router.navigate(['/app/reminders'])
      }
      resolve(!this.authState.isLoggedIn);
    });
  }
}
