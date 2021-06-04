import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PublicLayoutComponent} from "./modules/core/layout/public-layout/public-layout.component";
import {RoutesConstant} from "./constant/routes.constant";
import { AuthGuard } from './modules/core/auth-guard/auth-guard';

const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: RoutesConstant.LANDING,
        pathMatch: 'full'
      },
      {
        path: RoutesConstant.LANDING,
        loadChildren: () => import('./modules/landing/landing.module').then(m => m.LandingModule)
      },
      {
        path: RoutesConstant.LOGIN,
        loadChildren: () => import('./modules/sign-in/sign-in.module').then(m => m.SignInModule)
      },
      {
        path: RoutesConstant.REGISTER,
        loadChildren: () => import('./modules/sign-up/sign-up.module').then(m => m.SignUpModule)
      },
      {
        path: RoutesConstant.POLL,
        loadChildren: () => import('./modules/poll/poll.module').then(m => m.PollModule),
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
