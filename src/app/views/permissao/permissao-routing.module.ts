import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListPermissaoComponent } from "./list/list-permissao.component";

const routes: Routes = [
  { path: "", component: ListPermissaoComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissaoRoutingModule { }