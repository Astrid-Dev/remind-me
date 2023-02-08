import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {ShouldBeSignedInGuard} from "./helpers/should-be-signed-in.guard";
import {ShouldBeSignedOutGuard} from "./helpers/should-be-signed-out.guard";
import {ShouldVerifyEmailGuard} from "./helpers/should-verify-email.guard";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./sidemenu/sidemenu.module').then( m => m.SidemenuPageModule),
    canActivate: [ShouldBeSignedInGuard]
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomePageModule),
    canActivate: [ShouldBeSignedOutGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canActivate: [ShouldBeSignedOutGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule),
    canActivate: [ShouldBeSignedOutGuard]
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./pages/verify-email/verify-email.module').then( m => m.VerifyEmailPageModule),
    canActivate: [ShouldVerifyEmailGuard]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
