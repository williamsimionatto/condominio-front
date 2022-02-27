import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListCondominioComponent } from "./list/list-condominio.component";

const routes: Routes = [
  {
    path: "", component: ListCondominioComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CondominioRoutingModule {}