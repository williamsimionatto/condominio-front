import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs/operators";
import { PermissaoService } from "../../../service/permissao/permissao.service";
import { BaseComponent } from "../../base.component";

@Component({ templateUrl: '../add/add-edit.component.html' })
export class OverviewPermissaoComponent extends BaseComponent implements OnInit {
  permissaoForm: UntypedFormGroup
  id: string
  isAddMode: boolean
  readonly = true
  loading = false
  submitted = false

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private permissaoService: PermissaoService,
    private router: Router
  ) {
    super('CAD_PERMISSAO');
  }

  ngOnInit() {
    if (!this.canOverview()) {
      this.router.navigate(["/not-found"]);
    }

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

  onSubmit() {}

  get f() { return this.permissaoForm.controls; }
}