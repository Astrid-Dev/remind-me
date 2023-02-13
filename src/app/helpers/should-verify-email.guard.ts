import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ShouldVerifyEmailGuard implements CanActivate{
  constructor(private authState: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {
    // console.log(this.authState.isEmailVerified)
    // if(this.authState.isEmailVerified){
    //   this.router.navigate(['/app/reminders']);
    //   return false;
    // }
    // else if(this.authState.isEmailVerified === null){
    //   this.router.navigate(['/login']);
    //   return false;
    // }

    return true;
  }
}
