import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddEditCondominioComponent } from "./add/add-edit.component";
import { ListCondominioComponent } from "./list/list-condominio.component";
import { OverviewCondominioComponent } from "./overview/overview-condominio.component";

const routes: Routes = [
    {path: "", component: ListCondominioComponent},
    {path: "add", component: AddEditCondominioComponent},
    {path: "edit/:id", component: AddEditCondominioComponent},
    {path: "overview/:id", component: OverviewCondominioComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CondominioRoutingModule {}