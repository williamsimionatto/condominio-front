import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { SharedModule } from "../../containers/shared.module";
import { ModalCondominosComponent } from "./add/modal-condominos.component";
import { CondominosRoutingModule } from "./condominos-routing.module";
import { DetailCondominosComponent } from "./detail/detail-condomino.component";

@NgModule({
  imports: [
    CommonModule,
    CondominosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgSelectModule
  ],
  declarations: [
    DetailCondominosComponent,
    ModalCondominosComponent
  ],
  providers: [],
  exports: [
    DetailCondominosComponent,
    ModalCondominosComponent
  ]
})
export class CondominiosModule {

}
