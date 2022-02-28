import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs/operators";
import { CondominioService } from "../../../service/condominio/condominio.service";
import { NotificationService } from "../../../service/notification/notification.service";
import { DetailCondominosComponent } from "../../condominos/detail/detail-condomino.component";

@Component({
  templateUrl: "./add-edit.component.html",
  styleUrls: ['../../../../assets/css/default.scss']
})
export class AddEditCondominioComponent implements OnInit {
  condominioForm: FormGroup
  id: string
  isAddMode: boolean
  readonly = false
  loading = false
  submitted = false

  @ViewChild(DetailCondominosComponent) detail;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private condominioService: CondominioService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params["id"]
    this.isAddMode = !this.id
    this.condominioForm = this.formBuilder.group({
      id: this.formBuilder.control(""),
      name: this.formBuilder.control("", [Validators.required, Validators.minLength(5)]),
      cnpj: this.formBuilder.control("", [Validators.required, Validators.minLength(14)]),
      condominio2quartos: this.formBuilder.control("", [Validators.required]),
      condominio3quartos: this.formBuilder.control("", [Validators.required]),
      condominiosalacomercial: this.formBuilder.control("", [Validators.required]),
      valoragua: this.formBuilder.control("", [Validators.required]),
      valorsalaofestas: this.formBuilder.control("", [Validators.required]),
      valorlimpezasalaofestas: this.formBuilder.control("", [Validators.required]),
      valormudanca: this.formBuilder.control("", [Validators.required]),
      taxaboleto: this.formBuilder.control("", [Validators.required]),
      taxabasicaagua: this.formBuilder.control("", [Validators.required])
    })

    if (!this.isAddMode) {
      this.condominioService
        .getById(this.id)
        .pipe(first())
        .subscribe(x => {
          this.condominioForm.patchValue(x)
        })
    }
  }

  onSubmit() {
    this.submitted = true

    if (this.condominioForm.invalid) {
      return this.notificationService.showError("Preencha os campos obrigatórios", "Erro");
    }

    this.loading = true
    this.isAddMode ? this.create() : this.update();
  }

  private create() {
    this.condominioService
      .create(this.condominioForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.notificationService.showSuccess("Condomínio cadastrado com sucesso", "Sucesso");
          this.router.navigate(["/condominio"]);
        },
        error: error => {
          this.notificationService.showError(error.error.message, "Erro");
          this.loading = false;
        }
      });
  }

  private update() {
    this.condominioService
      .update(this.condominioForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.notificationService.showSuccess("Condomínio atualizado com sucesso", "Sucesso");
          this.router.navigate(["/condominio"]);
        },
        error: error => {
          this.notificationService.showError(error.error.message, "Erro");
          this.loading = false
        }
      });
  }

  formatValue(field: string, event: any) {
    let value = event.target.value.replace(',', '.').replace(/[^0-9.]/g, '');
    value = (Math.round(value * 100) / 100).toFixed(2);
    this.condominioForm.controls[field].setValue(value);
  }

  get f() { return this.condominioForm.controls }
}