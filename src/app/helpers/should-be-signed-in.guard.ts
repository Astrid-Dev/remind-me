import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ShouldBeSignedInGuard implements CanActivate{
  constructor(private authState: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {
    if(!this.authState.isLoggedIn){
      this.router.navigate(['/welcome']);
      return false;
    }
    return true;
  }
}
