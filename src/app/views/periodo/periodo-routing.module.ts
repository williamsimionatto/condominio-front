import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddEditPeriodoComponent } from "./add/add-edit.component";
import { ListPeriodoComponent } from "./list/list-periodo.component";

const routes: Routes = [
  { path: "", component: ListPeriodoComponent },
  { path: "add", component: AddEditPeriodoComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeriodoRoutingModule { }