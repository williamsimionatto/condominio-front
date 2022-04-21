import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { SharedModule } from "../../../containers/shared.module";
import { LeituraAguaReportRoutingModule } from "./leitura-agua-report-routing.module";
import { LeituraAguaReportComponent } from "./leitura-agua-report.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LeituraAguaReportRoutingModule,
    SharedModule,
    NgSelectModule
  ],
  declarations: [
    LeituraAguaReportComponent
  ],
})
export class LeituraAguaReportModule {
}