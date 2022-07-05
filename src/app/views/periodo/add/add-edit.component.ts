import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs/operators";
import { SelectOption } from "../../../model/selectOption.model";
import { NotificationService } from "../../../service/notification/notification.service";
import { PeriodService } from "../../../service/period/period.service";
import { BaseComponent } from "../../base.component";

@Component({
  templateUrl: "./add-edit.component.html",
  styleUrls: ['../../../../assets/css/default.scss']
})
export class AddEditPeriodoComponent extends BaseComponent implements OnInit {
  periodForm: FormGroup
  id: string
  isAddMode: boolean
  readonly = false
  loading = false
  submitted = false

   statusOptions: SelectOption[] = [
    { value: '', label: 'Selecione' },
    { value: 'A', label: 'Aberto' },
    { value: 'F', label: 'Fechado' }
  ]

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private periodService: PeriodService,
    private notificationService: NotificationService
  ) {
    super('CAD_PERIODO');
  }

  ngOnInit() {
    this.id = this.route.snapshot.params["id"]
    this.isAddMode = !this.id

    if ((!this.isAddMode && !this.canEdit()) || (this.isAddMode && !this.canAdd())) {
      this.router.navigate(["/not-found"]);
    }

    this.periodForm = this.formBuilder.group({
      id: this.formBuilder.control(""),
      name: this.formBuilder.control("", [Validators.required, Validators.minLength(5)]),
      start_date: this.formBuilder.control("", [Validators.required]),
      end_date: this.formBuilder.control("", [Validators.required]),
      status: this.formBuilder.control("", [Validators.required])
    })

    if (!this.isAddMode) {
      this.periodService
        .getById(this.id)
        .pipe(first())
        .subscribe(x => {
          this.periodForm.patchValue(x)
        })
    }
  }

  onSubmit() {
    this.submitted = true
    if (this.periodForm.invalid) {
      return this.notificationService.showError("Preencha os campos obrigatórios", "Erro");
    }

    this.loading = true
    this.isAddMode ? this.create() : this.update();
  }

  private create() {
    this.periodService
      .create(this.periodForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.notificationService.showSuccess('Período cadastrado com sucesso!', "Sucesso");
          this.router.navigate(["/periodo"]);
        },
        error: error => {
          this.notificationService.showError(error, "Erro");
          this.loading = false
        }
      });
  }

  private update() {
    this.periodForm.value.id = this.id
    this.periodService
      .update(this.periodForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.notificationService.showSuccess("Período atualizado com sucesso", "Sucesso");
          this.router.navigate(["/periodo"]);
        },
        error: error => {
          this.notificationService.showError("Aconteceu um erro ao atualizar o registro!", "Erro");
          this.loading = false
        }
      })
  }

  get f() { return this.periodForm.controls }

  canAdd(): boolean {
    return this.permissions.inserir === 'S';
  }
}