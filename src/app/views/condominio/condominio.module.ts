import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../containers/shared.module";
import { CondominioRoutingModule } from "./condominio-routing.module";

@NgModule({
  imports: [
    CommonModule,
    CondominioRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [],
  providers: []
})
export class CondominioModule {

}
