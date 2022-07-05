import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserService } from '../../../service';
import { ConfirmationDialogService } from '../../../service/confirmation-dialog/confirmation-dialog';
import { NotificationService } from '../../../service/notification/notification.service';
import { PermissionsService } from '../../../service/permissions/permissions.service';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['../../../../assets/css/default.scss']
})
export class ListUserComponent extends BaseComponent implements OnInit {
  users = null

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private router: Router,
    private confirmationDialogService: ConfirmationDialogService,
  ) {
    super('CAD_USUARIO');
  }

  ngOnInit(): void {
    if (!this.canOverview()) {
      this.router.navigate(['/not-found']);
    }

    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users
    })
  }

  hasPermission(tipo: string): boolean {
    return this.permissions[tipo] === 'S'
  }

  delete(userParams) {
    this.confirmationDialogService.confirm('Excluir Usuário', 'Deseja realmente excluir este usuário? Esta ação não poderá ser desfeita.', 'Excluir', 'Cancelar', "lg")
      .then((confirmed) => {
        if (!confirmed) {
          return;
        }

        const user = this.users.filter(user => user.id === userParams.id)
        user.isDeleting = true

        this.userService.delete(userParams.id).pipe(first()).subscribe((x) => {
          this.users = this.users.filter(user => user.id !== userParams.id)
        })
    
        this.notificationService.showSuccess('Registro excluído com sucesso!', 'Sucesso')
        this.users.splice(this.users.indexOf(userParams), 1);
      })
  }
}
