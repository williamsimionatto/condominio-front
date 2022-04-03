import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ProgressBarComponent } from "angular-progress-bar";
import { CardHeaderActionsComponent } from "./card-header-actions/card-header-actions.component";
import { CardHeaderComponent } from "./card-header/card-header.component";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { InputComponent } from "./input";

@NgModule({
  declarations: [
    InputComponent,
    CardHeaderComponent,
    CardHeaderActionsComponent,
    FileUploadComponent,
    ProgressBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    InputComponent,
    CardHeaderComponent,
    CardHeaderActionsComponent,
    FileUploadComponent,
    ProgressBarComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule 
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: []
    }
  }
}
