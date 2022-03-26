import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NotificationService } from "../../../service/notification/notification.service";
import { PerfilService } from "../../../service/perfil/perfil.service";
import { first } from "rxjs/operators";
import { ConfirmationDialogService } from "../../../service/confirmation-dialog/confirmation-dialog";
import { PermissionsService } from "../../../service/permissions/permissions.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './list-perfil.component.html',
  styleUrls: ['../../../../assets/css/default.scss']
})
export class ListPerfilComponent implements OnInit {
  perfis = null
  permission = null

  constructor(
    private perfilService: PerfilService,
    private router: Router,
    private notificationService: NotificationService,
    private confirmationDialogService: ConfirmationDialogService,
    private permissionService: PermissionsService
  ) {}

  ngOnInit() {
    this.perfilService.getAll().pipe(first()).subscribe(perfis => {
      this.perfis = perfis
    })

    this.permission = this.permissionService.getPermissionsbySigla('CAD_PERFIL')
  }

  hasPermission(tipo: string): boolean {
    return this.permission[tipo] === 'S'
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