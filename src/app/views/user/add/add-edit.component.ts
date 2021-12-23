import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../../../service';
import { NotificationService } from '../../../service/notification/notification.service';

@Component({
   templateUrl: 'add-edit.component.html',
   styleUrls: ['../../../../assets/css/default.scss']
})
export class AddEditUserComponent implements OnInit {
  userForm: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  readonly = false;
  numberPattern = /^[0-9]*$/
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  constructor (
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.userForm = this.formBuilder.group({
      id: this.formBuilder.control('', [Validators.nullValidator]),
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      password: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      passwordConfirmation: this.formBuilder.control('', [Validators.required, Validators.minLength(5)])
    });

    if (!this.isAddMode) {
      this.userService
        .getById(this.id)
        .pipe(first())
        .subscribe(x => { this.userForm.patchValue(x[0]) }
      );
    }
  }

  static equalsTo(group: AbstractControl): {[key:string]: boolean} {
    const password = group.get('password')
    const passwordConfirmation = group.get('passwordConfirmation')

    if (!password || !passwordConfirmation) {
      return undefined
    }

    if (password.value !== passwordConfirmation.value) {
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
    const passwordConfirmation = this.userForm.get('passwordConfirmation');
    return password.value === passwordConfirmation.value
  }

  private create() {
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
}
