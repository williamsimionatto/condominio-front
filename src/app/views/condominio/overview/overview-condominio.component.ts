import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { first } from "rxjs/operators";
import { CondominioService } from "../../../service/condominio/condominio.service";
import { PerfilService } from "../../../service/perfil/perfil.service";

@Component({ templateUrl: '../add/add-edit.component.html' })
export class OverviewCondominioComponent implements OnInit {
  condominioForm: FormGroup
  id: string
  isAddMode: boolean
  readonly = true
  loading = false
  submitted = false

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private condominioService: CondominioService,
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
      valormudanca: this.formBuilder.control("", [Validators.required])
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

  onSubmit() {}

  get f() { return this.condominioForm.controls; }

  formatValue(field: string, event: any) {
    let value = event.target.value.replace(',', '.').replace(/[^0-9.]/g, '');
    value = (Math.round(value * 100) / 100).toFixed(2);
    this.condominioForm.controls[field].setValue(value);
  }
}