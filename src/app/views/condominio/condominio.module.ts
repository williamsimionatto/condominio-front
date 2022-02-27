import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../containers/shared.module";
import { CondominiosModule } from "../condominos/condominos.module";
import { AddEditCondominioComponent } from "./add/add-edit.component";
import { CondominioRoutingModule } from "./condominio-routing.module";
import { ListCondominioComponent } from "./list/list-condominio.component";
import { OverviewCondominioComponent } from "./overview/overview-condominio.component";

@NgModule({
  imports: [
    CommonModule,
    CondominioRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CondominiosModule
  ],
  declarations: [
    ListCondominioComponent,
    AddEditCondominioComponent,
    OverviewCondominioComponent,
  ],
  providers: [
  ]
})
export class CondominioModule {

}
