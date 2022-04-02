import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { ButtonsModule } from "ngx-bootstrap/buttons";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { SharedModule } from "../../containers/shared.module";
import { LegendaValoresComponent } from "./legenda-valores/legenda-valores.component";
import { LeituraAguaValoresRoutingModule } from "./leitura-agua-valroes-routing.module";
import { ListLeituraAguaValoresComponent } from "./list/list.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LeituraAguaValoresRoutingModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    SharedModule,    
    NgSelectModule,
  ],
  declarations: [
    ListLeituraAguaValoresComponent,
    LegendaValoresComponent
  ],
  exports: [
    ListLeituraAguaValoresComponent,
    LegendaValoresComponent
  ]
})
export class LeituraAguaValoresModule {}