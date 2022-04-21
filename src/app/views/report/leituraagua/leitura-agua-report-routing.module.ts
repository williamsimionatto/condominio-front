import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LeituraAguaReportComponent } from "./leitura-agua-report.component";

const routes: Routes = [
  { path: "", component: LeituraAguaReportComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeituraAguaReportRoutingModule { }