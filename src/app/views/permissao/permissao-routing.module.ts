import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddEditPermissaoComponent } from "./add/add-edit.component";
import { ListPermissaoComponent } from "./list/list-permissao.component";
import { OverviewPermissaoComponent } from "./overview/overview-perfil.component";

const routes: Routes = [
  { path: "", component: ListPermissaoComponent },
  { path: "add", component: AddEditPermissaoComponent },
  { path: "edit/:id", component: AddEditPermissaoComponent },
  { path: "overview/:id", component: OverviewPermissaoComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissaoRoutingModule { }