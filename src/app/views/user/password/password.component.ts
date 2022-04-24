import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserParams } from '../../../model/user.model';
import { UserService } from '../../../service';
import { NotificationService } from '../../../service/notification/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './password.component.html',
  styleUrls: ['../../../../assets/css/default.scss']
})
export class PasswordComponent implements OnInit {
  user: UserParams
  passwordUserForm: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  readonly = true;
  readonly_password = true;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.passwordUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      password_new: this.formBuilder.control('', [Validators.required]),
      password__new_confirmation: this.formBuilder.control('', [Validators.required])
    });

    this.userService
      .getById(this.id)
      .pipe(first())
      .subscribe(x => {
        this.passwordUserForm.setValue({name: x.name, password: '', password_new: '', password__new_confirmation: ''})
        this.user = x;
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    if (this.passwordUserForm.invalid) {
      this.notificationService.showError('Aconteceu um erro alterar o registro!', 'Erro');
    }

    if (this.passwordUserForm.value.password_new !== this.passwordUserForm.value.password__new_confirmation) {
      this.notificationService.showError('A Nova Senha não confere!', 'Erro');
    }

    
    this.verifyPassword()
  }

  updatePassword() {
    this.passwordUserForm.value.id = this.id;
    let data = {
      id: this.passwordUserForm.value.id,
      password: this.passwordUserForm.value.password_new,
      password_confirmation: this.passwordUserForm.value.password_new
    }

    this.userService
      .updatePassword(data)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
          this.notificationService.showSuccess('Senha Atualizada com sucesso!', 'Sucesso');
        },
        error: ret => {
          this.notificationService.showError('Aconteceu um erro ao atualizar a senha!', 'Erro');
          this.loading = false;
        }
    });
  }

  verifyPassword() {
    this.passwordUserForm.value.id = this.id;
    let data = {
      id: this.passwordUserForm.value.id,
      password: this.passwordUserForm.value.password
    }

    this.userService
      .verifyPassword(data)
      .pipe(first())
      .subscribe((x: any) => {
        console.log(x)
        if (x.ok) {
          this.loading = true
          this.updatePassword()
        } else {
          this.notificationService.showError('A Senha Atual está incorreta!', 'Erro');
        }
      })
  }
}
