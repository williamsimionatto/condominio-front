import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddEditPeriodoComponent } from "./add/add-edit.component";
import { ListPeriodoComponent } from "./list/list-periodo.component";
import { OverviewPeriodoComponent } from "./overview/overview-periodo.component";

const routes: Routes = [
  { path: "", component: ListPeriodoComponent },
  { path: "add", component: AddEditPeriodoComponent },
  { path: "edit/:id", component: AddEditPeriodoComponent },
  { path: 'overview/:id', component: OverviewPeriodoComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeriodoRoutingModule { }