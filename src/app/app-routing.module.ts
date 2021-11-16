import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProdComponent } from './prod/prod.component';

const appRoutes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: '', component: HomeComponent }, //localhost:4200
      {
        path: 'test',
        loadChildren: () =>
          import('./test/test.module').then((module) => module.TestModule),
      },
      {
        path: 'syst',
        loadChildren: () =>
          import('./syst/syst.module').then((module) => module.SystModule),
      },
      { path: 'prod', component: ProdComponent }, //localhost:4200/prod
    ],
  },
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/page-not-found' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
