import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs/operators";
import { PerfilService } from "../../../service/perfil/perfil.service";
import { BaseComponent } from "../../base.component";

@Component({ templateUrl: '../add/add-edit.component.html' })
export class OverviewPerfilComponent extends BaseComponent implements OnInit {
  perfilForm: UntypedFormGroup
  id: string
  isAddMode: boolean
  readonly = true
  loading = false
  submitted = false

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private perfilService: PerfilService,
  ) {
    super('CAD_PERFIL');
  }

  ngOnInit() {
    if (!this.canOverview()) {
      this.router.navigate(["/not-found"]);
    }

    this.id = this.route.snapshot.params["id"]
    this.isAddMode = !this.id
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

  onSubmit() {}

  get f() { return this.perfilForm.controls; }
}