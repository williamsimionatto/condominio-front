import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { SharedModule } from "../../../containers/shared.module";
import { CashFlowReportRoutingModule } from "./cash-flow-report-routing.module";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgSelectModule,
    CashFlowReportRoutingModule
  ],
  declarations: [

  ],
})
export class CashFlowReportModule {
}