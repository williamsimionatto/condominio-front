import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { first } from "rxjs/operators";
import { PerfilService } from "../../../service/perfil/perfil.service";

@Component({ templateUrl: '../add/add-edit.component.html' })
export class OverviewPerfilComponent implements OnInit {
  perfilForm: FormGroup
  id: string
  isAddMode: boolean
  readonly = true
  loading = false
  submitted = false

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private perfilService: PerfilService,
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params["id"]
    this.isAddMode = !this.id
    this.perfilForm = this.formBuilder.group({
      id: this.formBuilder.control(""),
      name: this.formBuilder.control("", [Validators.required, Validators.minLength(5)]),
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

  onSubmit() {}

  get f() { return this.perfilForm.controls; }
}