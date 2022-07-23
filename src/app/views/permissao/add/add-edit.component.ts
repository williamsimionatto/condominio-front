import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs/operators";
import { NotificationService } from "../../../service/notification/notification.service";
import { PermissaoService } from "../../../service/permissao/permissao.service";
import { BaseComponent } from "../../base.component";

@Component({
  templateUrl: "./add-edit.component.html",
  styleUrls: ['../../../../assets/css/default.scss']
})
export class AddEditPermissaoComponent extends BaseComponent implements OnInit {
  permissaoForm: UntypedFormGroup
  id: string
  isAddMode: boolean
  readonly = false
  loading = false
  submitted = false

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private permissaoService: PermissaoService,
    private notificationService: NotificationService
  ) {
    super('CAD_PERMISSAO');
  }

  ngOnInit() {
    this.id = this.route.snapshot.params["id"]
    this.isAddMode = !this.id

    if ((!this.isAddMode && !this.canEdit()) || (this.isAddMode && !this.canAdd())) {
      this.router.navigate(["/not-found"]);
    }

    this.permissaoForm = this.formBuilder.group({
      id: this.formBuilder.control(""),
      name: this.formBuilder.control("", [Validators.required, Validators.minLength(5)]),
      sigla: this.formBuilder.control("", [Validators.required, Validators.minLength(3)]),
    })

    if (!this.isAddMode) {
      this.permissaoService
        .getById(this.id)
        .pipe(first())
        .subscribe(x => {
          this.permissaoForm.patchValue(x)
        })
    }
  }

  onSubmit() {
    this.submitted = true
    if (this.permissaoForm.invalid) {
      return this.notificationService.showError("Preencha os campos obrigatórios", "Erro");
    }

    this.loading = true
    this.isAddMode ? this.create() : this.update();
  }

  private create() {
    this.permissaoService
      .create(this.permissaoForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.notificationService.showSuccess('Aconteceu um erro ao salvar o registro!', "Sucesso");
          this.router.navigate(["/permissao"]);
        },
        error: error => {
          this.notificationService.showError(error, "Erro");
          this.loading = false
        }
      });
  }

  private update() {
    this.permissaoForm.value.id = this.id
    this.permissaoService
      .update(this.permissaoForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.notificationService.showSuccess("Perfil atualizado com sucesso", "Sucesso");
          this.router.navigate(["/permissao"]);
        },
        error: error => {
          this.notificationService.showError("Aconteceu um erro ao atualizar o registro!", "Erro");
          this.loading = false
        }
      })
  }

  get f() { return this.permissaoForm.controls }
}