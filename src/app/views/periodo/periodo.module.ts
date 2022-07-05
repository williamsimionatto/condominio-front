import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../containers/shared.module";
import { ListPeriodoComponent } from "./list/list-periodo.component";
import { PeriodoRoutingModule } from "./periodo-routing.module";

@NgModule({
  imports: [
    CommonModule,
    PeriodoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    ListPeriodoComponent
  ],
  providers: [
    
  ]
})
export class PeriodoModule {}