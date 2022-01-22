import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import swal from 'sweetalert';
import { UserService } from '../../../service';
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users
    })
  }

  delete(userParams) {
    swal({
      text: "Deseja realmente excluir este registro?",
      icon: "warning",
      dangerMode: true,
      buttons: ["Não", "Sim"]
    }).then((willDelete) => {
      if (willDelete) {
        const user = this.users.filter(user => user.id === userParams.id)
        user.isDeleting = true

        this.userService.delete(userParams.id).pipe(first()).subscribe(() => {
          this.users = this.users.filter(user => user.id !== userParams.id)
        })

        this.notificationService.showSuccess('Registro excluído com sucesso!', 'Sucesso')
        this.users.splice(this.users.indexOf(userParams), 1);
      }
    }).catch(() => {
      this.notificationService.showError('Não foi possível excluir o registro!', 'Erro')
    })
  }
}
