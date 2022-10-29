import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CashFlowReportComponent } from "./cash-flow-report.component";

const routes: Routes = [
  { path: "", component: CashFlowReportComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashFlowReportRoutingModule { }