import { Component, OnInit } from "@angular/core";
import { first } from "rxjs/operators";
import { ConfirmationDialogService } from "../../../service/confirmation-dialog/confirmation-dialog";
import { NotificationService } from "../../../service/notification/notification.service";
import { PermissaoService } from "../../../service/permissao/permissao.service";
import { PermissionsService } from "../../../service/permissions/permissions.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './list-permissao.component.html',
  styleUrls: ['../../../../assets/css/default.scss']
})
export class ListPermissaoComponent implements OnInit {
  permissoes = null
  permission = null

  constructor(
    private permissaoService: PermissaoService,
    private notificationService: NotificationService,
    private confirmationDialogService: ConfirmationDialogService,
    private permissionService: PermissionsService
  ) {}

  ngOnInit() {
    this.permissaoService.getAll().pipe(first()).subscribe(permissoes => {
      this.permissoes = permissoes
    })
    
    this.permission = this.permissionService.getPermissionsbySigla('CAD_PERMISSAO')
  } 
 
  hasPermission(tipo: string): boolean {
    return this.permission[tipo] === 'S'
  }	

  delete(permissaoParams) {
    this.confirmationDialogService.confirm('Excluir Permissão', 'Deseja realmente excluir esta permissão? Esta ação não poderá ser desfeita.', 'Excluir', 'Cancelar', "lg")
      .then((confirmed) => {
        if (!confirmed) {
          return;
        }

        const permissao = this.permissoes.filter(permissao => permissao.id === permissaoParams.id)
        permissao.isDeleting = true
    
        this.permissaoService.delete(permissaoParams.id).subscribe(
          results => {
            this.notificationService.showSuccess('Registro excluído com sucesso!', 'Sucesso')
            this.permissoes.splice(this.permissoes.indexOf(permissaoParams), 1);   
          },
          error => {
            permissao.isDeleting = false
            this.notificationService.showError('Não é possível excluir este registro', 'Erro')
          }
        )
      })
      .catch(() => {

      })
  }
}