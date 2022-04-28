import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { first } from "rxjs/operators";
import { CondominioParams } from "../../../model/condominio.model";
import { CondominioService } from "../../../service/condominio/condominio.service";
import { ConfirmationDialogService } from "../../../service/confirmation-dialog/confirmation-dialog";
import { NotificationService } from "../../../service/notification/notification.service";
import { BaseComponent } from "../../base.component";

@Component({
  selector: "app-list-condominio",
  templateUrl: "./list-condominio.component.html",
  styleUrls: ['../../../../assets/css/default.scss']
})
export class ListCondominioComponent extends BaseComponent implements OnInit {
  condominios = null

  constructor(
    private condominioService: CondominioService,
    private notificationService: NotificationService,
    private confirmationDialogService: ConfirmationDialogService,
    private router: Router,
  ) {
    super('CAD_CONDOMINIO')
  }

  ngOnInit() {
    if (!this.canOverview()) {
      this.router.navigate(['/not-found'])
    }

    this.condominioService.getAll().pipe(first()).subscribe(condominios => {
      this.condominios = condominios
    })

    this.permissions = this.permissionService.getPermissionsbySigla('CAD_CONDOMINIO')
  }

  hasPermission(tipo: string): boolean {
    return this.permissions[tipo] === 'S'
  }

  delete(condominioParams: CondominioParams) {
    this.confirmationDialogService.confirm('Excluir Condomínio', 'Deseja realmente excluir este Condomínio? Esta ação não poderá ser desfeita.', 'Excluir', 'Cancelar', "lg")
      .then((confirmed) => {
        if (!confirmed) {
          return;
        }

        const condominio = this.condominios.filter(condominio => condominio.id === condominioParams.id)
        condominio.isDeleting = true

        this.condominioService.delete(condominioParams.id).subscribe(
          results => {
            this.notificationService.showSuccess('Registro excluído com sucesso!', 'Sucesso')
            this.condominios.splice(this.condominios.indexOf(condominioParams), 1);
          },
          error => {
            condominio.isDeleting = false
            this.notificationService.showError('Não é possível excluir este Condomínio pois ele está vinculado a um Usuário', 'Erro')
          }
        )
      })
      .catch(() => {

      })
  }
}