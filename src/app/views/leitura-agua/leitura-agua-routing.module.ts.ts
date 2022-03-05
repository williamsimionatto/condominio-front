import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListLeituraAguaComponent } from "./list/list.component";

const routes: Routes = [
  { path: "", component: ListLeituraAguaComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeituraAguaRoutingModule { }