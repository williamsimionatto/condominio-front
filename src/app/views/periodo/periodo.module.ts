import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { SharedModule } from "../../containers/shared.module";
import { AddEditPeriodoComponent } from "./add/add-edit.component";
import { ListPeriodoComponent } from "./list/list-periodo.component";
import { OverviewPeriodoComponent } from "./overview/overview-periodo.component";
import { PeriodoRoutingModule } from "./periodo-routing.module";

@NgModule({
  imports: [
    CommonModule,
    PeriodoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgSelectModule
  ],
  declarations: [
    ListPeriodoComponent,
    AddEditPeriodoComponent,
    OverviewPeriodoComponent
  ],
  providers: [
    
  ]
})
export class PeriodoModule {}