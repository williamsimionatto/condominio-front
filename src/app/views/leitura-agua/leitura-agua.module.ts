import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { LeituraAguaRoutingModule } from './leitura-agua-routing.module';
import { ListLeituraAguaComponent } from './list/list.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    LeituraAguaRoutingModule,
    BsDropdownModule,
    ButtonsModule.forRoot()
  ],
  declarations: [
    ListLeituraAguaComponent
  ]
})
export class LeituraAguaModule { }