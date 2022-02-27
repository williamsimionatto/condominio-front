import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../containers/shared.module";
import { AddEditCondominioComponent } from "./add/add-edit.component";
import { CondominioRoutingModule } from "./condominio-routing.module";
import { ListCondominioComponent } from "./list/list-condominio.component";

@NgModule({
  imports: [
    CommonModule,
    CondominioRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    ListCondominioComponent,
    AddEditCondominioComponent
  ],
  providers: []
})
export class CondominioModule {

}
