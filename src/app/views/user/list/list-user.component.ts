import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserService } from '../../../service';
import { ConfirmationDialogService } from '../../../service/confirmation-dialog/confirmation-dialog';
import { NotificationService } from '../../../service/notification/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './list-user.component.html',
  styleUrls: ['../../../../assets/css/default.scss']
})
export class ListUserComponent implements OnInit {
  users = null

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private router: Router,
    private confirmationDialogService: ConfirmationDialogService
  ) {}

  ngOnInit(): void {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users
    })
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
      .catch(() => {

      })
  }
}
