import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListPerfilComponent } from "./list/list-perfil.component";

const routes: Routes = [
  { path: "", component: ListPerfilComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }