import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { AuthGuardService as AuthGuard } from './service/auth/auth-guard.service';
import { CanLoadService } from './service/can-load/can-load.service';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login'
    }
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: 'condominio',
        loadChildren: () => import('./views/condominio/condominio.module').then(m => m.CondominioModule),
        canActivate: [AuthGuard],
        canLoad: [CanLoadService]
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard],
        canLoad: [CanLoadService]
      },
      {
        path: 'leituraagua',
        loadChildren: () => import('./views/leitura-agua/leitura-agua.module').then(m => m.LeituraAguaModule),
        canActivate: [AuthGuard],
        canLoad: [CanLoadService]
      },
      {
        path: 'perfil',
        loadChildren: () => import('./views/perfil/perfil.module').then(m => m.PerfilModule),
        canActivate: [AuthGuard],
        canLoad: [CanLoadService]
      },
      {
        path: 'permissao',
        loadChildren: () => import('./views/permissao/permissao.module').then(m => m.PermissaoModule),
        canActivate: [AuthGuard],
        canLoad: [CanLoadService]
      },
      {
        path: 'usuario',
        loadChildren: () => import('./views/user/user.module').then(m => m.UserModule),
        canActivate: [AuthGuard],
        canLoad: [CanLoadService]
      },
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
