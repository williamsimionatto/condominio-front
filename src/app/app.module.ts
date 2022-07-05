import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { AuthGuardService } from './service/auth/auth-guard.service';
import { UserModule } from './views/user/user.module';
import { PerfilModule } from './views/perfil/perfil.module';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './containers/shared.module';
import { PermissaoModule } from './views/permissao/permissao.module';
import { ConfirmationDialogService } from './service/confirmation-dialog/confirmation-dialog';
import { ConfirmationDialogComponent } from './containers/confirmation-dialog/confirmation-dialog.component';
import { CondominioModule } from './views/condominio/condominio.module';
import { CondominiosModule } from './views/condominos/condominos.module';
import { ModalDialogService } from './service/modal/modal-dialog.service';
import { LeituraAguaModule } from './views/leitura-agua/leitura-agua.module';
import { LeituraAguaValoresModule } from './views/leitura-agua-valores/leitura-agua-valores.module';
import { CanLoadService } from './service/can-load/can-load.service';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { LeituraAguaReportModule } from './views/report/leituraagua/leitura-agua-report.module';
import { ChartModule } from 'angular-highcharts';
import { BarChartModule } from './views/report/leituraagua/charts/bar-chart.module';
import { ChangePasswordModule } from './views/change-password/change-password.module';
import { PeriodoModule } from './views/periodo/periodo.module';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        AppAsideModule,
        AppBreadcrumbModule.forRoot(),
        AppFooterModule,
        AppHeaderModule,
        AppSidebarModule,
        PerfectScrollbarModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        BsDropdownModule.forRoot(),
        TabsModule.forRoot(),
        ChartsModule,
        IconModule,
        IconSetModule.forRoot(),
        CondominioModule,
        CondominiosModule,
        LeituraAguaModule,
        LeituraAguaValoresModule,
        UserModule,
        PeriodoModule,
        ChangePasswordModule,
        PerfilModule,
        PermissaoModule,
        LeituraAguaReportModule,
        FormsModule,
        NgProgressModule.withConfig({
            color: "red",
            spinner: false
        }),
        NgProgressHttpModule,
        ToastrModule.forRoot(),
        SharedModule.forRoot(),
        NgSelectModule,
        NgbProgressbarModule,
        ChartModule,
        BarChartModule,
    ],
    declarations: [
        AppComponent,
        ...APP_CONTAINERS,
        P404Component,
        P500Component,
        LoginComponent,
        ConfirmationDialogComponent,
    ],
    providers: [
        AuthGuardService,
        CanLoadService,
        Storage,
        {
            provide: JWT_OPTIONS,
            useValue: JWT_OPTIONS
        },
        JwtHelperService,
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        },
        IconSetService,
        ConfirmationDialogService,
        ModalDialogService,
        { provide: LOCALE_ID, useValue: 'pt-BR' }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
