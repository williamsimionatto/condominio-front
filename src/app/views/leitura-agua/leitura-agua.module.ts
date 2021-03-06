import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { LeituraAguaRoutingModule } from './leitura-agua-routing.module';
import { ListLeituraAguaComponent } from './list/list.component';
import { CommonModule } from '@angular/common';
import { AddEditLeituraAguaComponent } from './add/add.component';
import { SharedModule } from '../../containers/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { LeituraAguaValoresModule } from '../leitura-agua-valores/leitura-agua-valores.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LeituraAguaRoutingModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    SharedModule,    
    NgSelectModule,
    LeituraAguaValoresModule
  ],
  declarations: [
    ListLeituraAguaComponent,
    AddEditLeituraAguaComponent,
  ]
})
export class LeituraAguaModule { }
