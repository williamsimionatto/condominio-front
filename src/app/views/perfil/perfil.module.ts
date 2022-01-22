import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../containers/shared.module";
import { AddEditPerfilComponent } from "./add/add-edit.component";
import { ListPerfilComponent } from "./list/list-perfil.component";
import { PerfilRoutingModule } from "./perfil-routing.module";

@NgModule({
  imports: [
    CommonModule,
    PerfilRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    ListPerfilComponent,
    AddEditPerfilComponent
  ],
  providers: [
    
  ]
})
export class PerfilModule {
}