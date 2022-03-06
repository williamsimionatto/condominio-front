import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddEditLeituraAguaComponent } from "./add/add.component";
import { ListLeituraAguaComponent } from "./list/list.component";

const routes: Routes = [
  { path: "", component: ListLeituraAguaComponent },
  { path: "add", component: AddEditLeituraAguaComponent},
  { path: "edit/:id", component: AddEditLeituraAguaComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeituraAguaRoutingModule { }