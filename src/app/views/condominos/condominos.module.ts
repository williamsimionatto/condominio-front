import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../containers/shared.module";
import { CondominosRoutingModule } from "./condominos-routing.module";
import { DetailCondominosComponent } from "./detail/detail-condomino.component";

@NgModule({
  imports: [
    CommonModule,
    CondominosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    DetailCondominosComponent,
  ],
  providers: [],
  exports: [
    DetailCondominosComponent
  ]
})
export class CondominiosModule {

}
