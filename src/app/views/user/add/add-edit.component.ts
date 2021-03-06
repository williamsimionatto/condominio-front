import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../../../service';
import { NotificationService } from '../../../service/notification/notification.service';
import { PerfilService } from '../../../service/perfil/perfil.service';
import { BaseComponent } from '../../base.component';

@Component({
   templateUrl: 'add-edit.component.html',
   styleUrls: ['../../../../assets/css/default.scss']
})
export class AddEditUserComponent extends BaseComponent implements OnInit {
  userForm: UntypedFormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  readonly = false;
  readonly_password = false
  numberPattern = /^[0-9]*$/
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  activeOptions = [
    { value: "", name: 'Selecione'},
    { value: "S", name: 'Sim' },
    { value: "N", name: 'Não' },
  ];

  perfilOptions = [
    { value: "", name: 'Selecione'},
  ]

  constructor (
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private notificationService: NotificationService,
    private perfilService: PerfilService
  ) {
    super('CAD_USUARIO')
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    if ((!this.isAddMode && !this.canEdit()) || (this.isAddMode && !this.canAdd())) {
      this.router.navigate(["/not-found"]);
    }

    this.userForm = this.formBuilder.group({
      id: this.formBuilder.control('', [Validators.nullValidator]),
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      password: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      password_confirmation: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      active: this.formBuilder.control('', [Validators.required]),
      perfilId: this.formBuilder.control('', [Validators.required]),
      cpf: this.formBuilder.control('', [Validators.required, Validators.minLength(11)]),
    });

    this.getPerfis()
    if (!this.isAddMode) {
      this.readonly_password = true;
      this.userService
        .getById(this.id)
        .pipe(first())
        .subscribe(x => {
          this.userForm.patchValue(x)
        }
      );
    }
  }

  static equalsTo(group: AbstractControl): {[key:string]: boolean} {
    const password = group.get('password')
    const password_confirmation = group.get('password_confirmation')

    if (!password || !password_confirmation) {
      return undefined
    }

    if (password.value !== password_confirmation.value) {
      return { passwordNotMatch: true }
    }

    return undefined
  }

  onSubmit() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return this.notificationService.showError('Preencha todos os campos obrigatórios', 'Atenção');
    }
    
    if (!this.validPassword()) {
      return this.notificationService.showInfo('As senhas não conferem!', 'Atenção');
    }

    this.loading = true;
    this.isAddMode ? this.create() :  this.update();
  }

  validPassword() {
    const password = this.userForm.get('password');
    const password_confirmation = this.userForm.get('password_confirmation');
    return password.value === password_confirmation.value
  }

  private create() {
    this.userForm.value.perfil_id = this.userForm.value.perfilId;

    this.userService
      .create(this.userForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['../'], { relativeTo: this.route });
          this.notificationService.showSuccess('Registro criado com sucesso!', 'Sucesso');
        },
        error: ret => {
          this.notificationService.showError('Aconteceu um erro ao salvar o registro!', 'Erro');
          this.loading = false;
        }
    });
  }

  private update() {
    this.userForm.value.id = this.id;
    this.userForm.value.perfil_id = this.userForm.value.perfilId;

    this.userService.update(this.userForm.value).pipe(first()).subscribe(
      {
        next: () => {
          this.router.navigate(['../../'], { relativeTo: this.route });
          this.notificationService.showSuccess('Registro atualizado com sucesso!', 'Sucesso');
        },
        error: error => {
          this.notificationService.showError('Aconteceu um erro ao atualizar o registro!', 'Erro');
          this.loading = false;
        }
      }
    );
  }

  get f() {
    return this.userForm.controls; 
  }

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
