import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs/operators";
import { NotificationService } from "../../../service/notification/notification.service";
import { PermissaoService } from "../../../service/permissao/permissao.service";

@Component({
  templateUrl: "./add-edit.component.html",
  styleUrls: ['../../../../assets/css/default.scss']
})
export class AddEditPermissaoComponent implements OnInit {
  permissaoForm: FormGroup
  id: string
  isAddMode: boolean
  readonly = false
  loading = false
  submitted = false

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private permissaoService: PermissaoService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params["id"]
    this.isAddMode = !this.id
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