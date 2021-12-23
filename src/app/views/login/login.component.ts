import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { LoginSuccessParams } from '../../model/login-success.model';
import { LocalStorageService } from '../../service';
import { LoginService } from '../../service/login/login.service';
import { NotificationService } from '../../service/notification/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['../../../assets/css/default.scss']
})
export class LoginComponent {
  loginForm: FormGroup
  loading = false;

  constructor (
    private notifyService : NotificationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required]),
      password: this.formBuilder.control('', [Validators.required])
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return this.notifyService.showError('Usuário e/ou senha Incorretos', 'Anteção');
    }

    this.loading = true;
    this.loginService.login(this.loginForm.value).pipe(first()).subscribe({
      next: (data: LoginSuccessParams) => {
        this.notifyService.showSuccess('Login realizado com sucesso', 'Sucesso');
        this.localStorageService.setItem('token', data.token);
        this.localStorageService.setItem('name', data.name);

        this.router.navigate(['/dashboard']);
      },
      error: (error: Error) => {
        this.loading = false
        this.notifyService.showError('Usuário e/ou senha Incorretos', 'Erro');
      }
    })
  }
}
