import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../../../service';
import { PerfilService } from '../../../service/perfil/perfil.service';
import { BaseComponent } from '../../base.component';

@Component({ templateUrl: '../add/add-edit.component.html' })
export class OverUserViewComponent extends BaseComponent implements OnInit {
  userForm: UntypedFormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  readonly = true;
  readonly_password = true;

  activeOptions = [
    { value: "", name: 'Selecione'},
    { value: "S", name: 'Sim' },
    { value: "N", name: 'Não' },
  ];

  perfilOptions = [
    { value: "", name: 'Selecione'},
  ]

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private perfilService: PerfilService,
    private router: Router
  ) {
    super('CAD_USUARIO')
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    if (!this.canOverview()) {
      this.router.navigate(['/not-found']);
    }

    this.userForm = this.formBuilder.group({
      id: this.formBuilder.control('', [Validators.nullValidator]),
      name: this.formBuilder.control('', [Validators.required]),
      email: this.formBuilder.control('', [Validators.required]),
      password: this.formBuilder.control('', [Validators.required]),
      password_confirmation: this.formBuilder.control('', [Validators.required]),
      active: this.formBuilder.control('', [Validators.required]),
      perfilId: this.formBuilder.control('', [Validators.required]),
      cpf: this.formBuilder.control('', [Validators.required]),
    });

    this.userForm.get('active').disable();
    this.userForm.get('perfilId').disable();

    this.getPerfis()

    if (!this.isAddMode) {
      this.userService
        .getById(this.id)
        .pipe(first())
        .subscribe(x => { this.userForm.patchValue(x) }
      );
    }
  }

  get f() { return this.userForm.controls; }

  onSubmit() {}

  private getPerfis() {
    this.perfilService.getAll().pipe(first()).subscribe(
      data => {
        let options = data.map(x => {
          return { value: x.id, name: x.name }
        })

        this.perfilOptions = this.perfilOptions.concat(options)
      }
    )
  }
}