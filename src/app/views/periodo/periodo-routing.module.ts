import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListPeriodoComponent } from "./list/list-periodo.component";

const routes: Routes = [
  { path: "", component: ListPeriodoComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeriodoRoutingModule { }