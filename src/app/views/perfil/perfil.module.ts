import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ListPerfilComponent } from "./list/list-perfil.component";
import { PerfilRoutingModule } from "./perfil-routing.modules";

@NgModule({
  imports: [
    CommonModule,
    PerfilRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ListPerfilComponent,
  ],
  providers: [
    
  ]
})
export class PerfilModule {
}