import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { SharedModule } from "../../../containers/shared.module";
import { CashFlowReportRoutingModule } from "./cash-flow-report-routing.module";
import { CashFlowReportComponent } from "./cash-flow-report.component";
import { BarChartModule } from "./charts/bar-chart.module";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgSelectModule,
    CashFlowReportRoutingModule,
    BarChartModule,
  ],
  declarations: [
    CashFlowReportComponent
  ],
})
export class CashFlowReportModule {
}