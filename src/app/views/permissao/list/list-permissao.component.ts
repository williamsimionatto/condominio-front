import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { first } from "rxjs/operators";
import { ConfirmationDialogService } from "../../../service/confirmation-dialog/confirmation-dialog";
import { NotificationService } from "../../../service/notification/notification.service";
import { PermissaoService } from "../../../service/permissao/permissao.service";
import { PermissionsService } from "../../../service/permissions/permissions.service";
import { BaseComponent } from "../../base.component";

@Component({
  selector: 'app-list-permissao',
  templateUrl: './list-permissao.component.html',
  styleUrls: ['../../../../assets/css/default.scss']
})
export class ListPermissaoComponent extends BaseComponent implements OnInit {
  permissoes = null

  constructor(
    private permissaoService: PermissaoService,
    private notificationService: NotificationService,
    private confirmationDialogService: ConfirmationDialogService,
    private router: Router
  ) {
    super('CAD_PERMISSAO');
  }

  ngOnInit() {
    if (!this.canOverview()) {
      this.router.navigate(['/not-found']);
    }

    this.permissaoService.getAll().pipe(first()).subscribe(permissoes => {
      this.permissoes = permissoes
    })
  }
 
  hasPermission(tipo: string): boolean {
    return this.permissions[tipo] === 'S'
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
  }
}