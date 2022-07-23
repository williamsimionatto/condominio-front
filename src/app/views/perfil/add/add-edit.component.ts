import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs/operators";
import { NotificationService } from "../../../service/notification/notification.service";
import { PerfilService } from "../../../service/perfil/perfil.service";
import { BaseComponent } from "../../base.component";

@Component({
  templateUrl: "./add-edit.component.html",
  styleUrls: ['../../../../assets/css/default.scss']
})
export class AddEditPerfilComponent extends BaseComponent implements OnInit {
  perfilForm: UntypedFormGroup
  id: string
  isAddMode: boolean
  readonly = false
  loading = false
  submitted = false

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private perfilService: PerfilService,
    private notificationService: NotificationService
  ) {
    super('CAD_PERFIL');
  }

  ngOnInit() {
    this.id = this.route.snapshot.params["id"]
    this.isAddMode = !this.id

    if ((!this.isAddMode && !this.canEdit()) || (this.isAddMode && !this.canAdd())) {
      this.router.navigate(["/not-found"]);
    }

    this.perfilForm = this.formBuilder.group({
      id: this.formBuilder.control(""),
      name: this.formBuilder.control("", [Validators.required, Validators.minLength(5)]),
      sigla: this.formBuilder.control("", [Validators.required, Validators.maxLength(4)])
    })

    if (!this.isAddMode) {
      this.perfilService
        .getById(this.id)
        .pipe(first())
        .subscribe(x => {
          this.perfilForm.patchValue(x)
        })
    }
  }

  onSubmit() {
    this.submitted = true
    if (this.perfilForm.invalid) {
      return this.notificationService.showError("Preencha os campos obrigatórios", "Erro");
    }

    this.loading = true
    this.isAddMode ? this.create() : this.update();
  }

  private create() {
    this.perfilService
      .create(this.perfilForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.notificationService.showSuccess('Perfil cadastrado com sucesso!', "Sucesso");
          this.router.navigate(["/perfil"]);
        },
        error: error => {
          this.notificationService.showError(error, "Erro");
          this.loading = false
        }
      });
  }

  private update() {
    this.perfilForm.value.id = this.id
    this.perfilService
      .update(this.perfilForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.notificationService.showSuccess("Perfil atualizado com sucesso", "Sucesso");
          this.router.navigate(["/perfil"]);
        },
        error: error => {
          this.notificationService.showError("Aconteceu um erro ao atualizar o registro!", "Erro");
          this.loading = false
        }
      })
  }

  get f() { return this.perfilForm.controls }

  canAdd(): boolean {
    return this.permissions.inserir === 'S';
  }
}