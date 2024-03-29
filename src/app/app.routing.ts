import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { AuthGuardService as AuthGuard } from './service/auth/auth-guard.service';
import { CanLoadService } from './service/can-load/can-load.service';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { PrivacyPoliceComponent } from './views/privacy-police/privacy-police.component';

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
    path: 'politica-privacidade',
    component: PrivacyPoliceComponent,
    data: {
      title: 'Política de Privacidade'
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
        path: 'alterarsenha',
        loadChildren: () => import('./views/change-password/change-password.module').then(m => m.ChangePasswordModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'condominio',
        loadChildren: () => import('./views/condominio/condominio.module').then(m => m.CondominioModule),
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
        path: 'periodo',
        loadChildren: () => import('./views/periodo/periodo.module').then(m => m.PeriodoModule),
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
        path: 'report/leituraagua',
        loadChildren: () => import('./views/report/leituraagua/leitura-agua-report.module').then(m => m.LeituraAguaReportModule),
        canActivate: [AuthGuard],
        canLoad: [CanLoadService]
      },
      {
        path: 'report/cashflow',
        loadChildren: () => import('./views/report/cashflow/cash-flow-report.module').then(m => m.CashFlowReportModule),
        canActivate: [AuthGuard],
        canLoad: [CanLoadService]
      },
      {
        path: 'usuario',
        loadChildren: () => import('./views/user/user.module').then(m => m.UserModule),
        canActivate: [AuthGuard],
        canLoad: [CanLoadService]
      },
      {
      path: 'not-found',
        component: P404Component,
        data: {
          title: 'Page 404'
        }
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
