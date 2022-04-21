import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../../containers/shared.module";
import { LeituraAguaReportRoutingModule } from "./leitura-agua-report-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LeituraAguaReportRoutingModule,
    SharedModule
  ],
  declarations: [
  ],
})
export class LeituraAguaReportModule {
}