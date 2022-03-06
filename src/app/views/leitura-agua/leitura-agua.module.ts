import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { LeituraAguaRoutingModule } from './leitura-agua-routing.module';
import { ListLeituraAguaComponent } from './list/list.component';
import { CommonModule } from '@angular/common';
import { AddEditLeituraAguaComponent } from './add/add.component';
import { SharedModule } from '../../containers/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { OverviewLeituraAguaComponent } from './overview/overview-perfil.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    LeituraAguaRoutingModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    SharedModule,    
    NgSelectModule
  ],
  declarations: [
    ListLeituraAguaComponent,
    AddEditLeituraAguaComponent,
    OverviewLeituraAguaComponent
  ]
})
export class LeituraAguaModule { }
