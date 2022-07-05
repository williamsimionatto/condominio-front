import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NotificationService } from "../../../service/notification/notification.service";
import { PerfilService } from "../../../service/perfil/perfil.service";
import { first } from "rxjs/operators";
import { ConfirmationDialogService } from "../../../service/confirmation-dialog/confirmation-dialog";
import { PermissionsService } from "../../../service/permissions/permissions.service";
import { UserParamsAuth } from "../../../model/user.model";
import { LocalStorageService } from "../../../service";
import { BaseComponent } from "../../base.component";

@Component({
  selector: 'app-list-perfil',
  templateUrl: './list-perfil.component.html',
  styleUrls: ['../../../../assets/css/default.scss']
})
export class ListPerfilComponent extends BaseComponent implements OnInit {
  perfis = null
  user: UserParamsAuth

  constructor(
    private perfilService: PerfilService,
    private router: Router,
    private notificationService: NotificationService,
    private confirmationDialogService: ConfirmationDialogService,
  ) {
    super('CAD_PERFIL');
  }

  ngOnInit() {
    if (!this.canOverview()) {
      this.router.navigate(["/not-found"]);
    }

    this.user = JSON.parse(this.localStorageService.getItem('user'));
    this.perfilService.getAll().pipe(first()).subscribe(perfis => {
      this.perfis = perfis
    })
  }

  hasPermission(tipo: string): boolean {
    return this.permissions[tipo] === 'S'
  }

  delete(perfilParams) {
    this.confirmationDialogService.confirm('Excluir Perfil', 'Deseja realmente excluir este perfil? Esta ação não poderá ser desfeita.', 'Excluir', 'Cancelar', "lg")
      .then((confirmed) => {
        if (!confirmed) {
          return;
        }

        const perfil = this.perfis.filter(perfil => perfil.id === perfilParams.id)
        perfil.isDeleting = true
    
        this.perfilService.delete(perfilParams.id).subscribe(
          results => {
            this.notificationService.showSuccess('Registro excluído com sucesso!', 'Sucesso')
            this.perfis.splice(this.perfis.indexOf(perfilParams), 1);   
          },
          error => {
            perfil.isDeleting = false
            this.notificationService.showError('Não é possível excluir este Perfil pois ele está vinculado a um Usuário', 'Erro')
          }
        )
      })
      .catch(() => {

      })
  }
}