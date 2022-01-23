import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../containers/shared.module";
import { AddEditPermissaoComponent } from "./add/add-edit.component";
import { ListPermissaoComponent } from "./list/list-permissao.component";
import { PermissaoRoutingModule } from "./permissao-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PermissaoRoutingModule,
    SharedModule
  ],
  declarations: [
    ListPermissaoComponent,
    AddEditPermissaoComponent
  ],
})
export class PermissaoModule {
}