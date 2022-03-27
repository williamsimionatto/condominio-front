import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CardHeaderComponent } from "./card-header/card-header.component";
import { InputComponent } from "./input";

@NgModule({
  declarations: [InputComponent, CardHeaderComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [InputComponent, CardHeaderComponent, CommonModule, FormsModule, ReactiveFormsModule ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: []
    }
  }
}