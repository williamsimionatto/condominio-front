import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { LocalStorageService } from '../../service';
import { LoginService } from '../../service/login/login.service';
import { NotificationService } from '../../service/notification/notification.service';

@Component({
  selector: 'app-login',
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
      next: (data: any) => {
        this.localStorageService.setItem('token', data.access_token);
        this.localStorageService.setItem('user', JSON.stringify(data.user));
        this.localStorageService.setItem('permissions', JSON.stringify(data.permissions));

        this.loading = false
        this.router.navigate(['/']);
      },
      error: (error: Error) => {
        this.loading = false
        this.notifyService.showError('Credenciais inválidas', 'Erro');
      }
    })
  }
}
