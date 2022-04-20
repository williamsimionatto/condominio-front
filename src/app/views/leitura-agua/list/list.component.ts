import { Component, OnInit } from "@angular/core";
import { first } from "rxjs/operators";
import { LeituraAguaParams } from "../../../model/leitura-agua.model";
import { ConfirmationDialogService } from "../../../service/confirmation-dialog/confirmation-dialog";
import { LeituraAguaService } from "../../../service/leitura-agua/leitura-agua.service";
import { NotificationService } from "../../../service/notification/notification.service";
import { PermissionsService } from "../../../service/permissions/permissions.service";

@Component({
  selector: 'app-list-leitura-agua',
  templateUrl: './list.component.html',
  styleUrls: ['../../../../assets/css/default.scss']
})
export class ListLeituraAguaComponent implements OnInit {
  leituraAgua = null
  permissions = null

  constructor(
    private leituraAguaService: LeituraAguaService,
    private notificationService: NotificationService,
    private confirmationDialogService: ConfirmationDialogService,
    private permissionService: PermissionsService
  ) {}

  ngOnInit() {
    this.leituraAguaService.getAll().pipe(first()).subscribe(leituraAgua => {
      this.leituraAgua = leituraAgua
    })

    this.permissions = this.permissionService.getPermissionsbySigla('TAR_LEITURAAGUA')
  }

  hasPermission(tipo: string): boolean {
    return this.permissions[tipo] === 'S'
  }

  delete(leituraAguaParams: LeituraAguaParams) {
    this.confirmationDialogService.confirm('Excluir Leitura', 'Deseja realmente excluir esta Leitura? Esta ação não poderá ser desfeita.', 'Excluir', 'Cancelar', "lg")
      .then((confirmed) => {
        if (!confirmed) {
          return;
        }

        const leituraAgua = this.leituraAgua.filter(leituraAgua => leituraAgua.id === leituraAguaParams.id)
        leituraAgua.isDeleting = true

        this.leituraAguaService.delete(leituraAguaParams.id).subscribe(
          results => {
            this.notificationService.showSuccess('Registro excluído com sucesso!', 'Sucesso')
            this.leituraAgua.splice(this.leituraAgua.indexOf(leituraAguaParams), 1);
          },
          error => {
            leituraAgua.isDeleting = false
            this.notificationService.showError('Não é possível excluir esta Leitura pois ela está vinculado a outros registros', 'Erro')
          }
        )
      })
      .catch(() => {

      })
  }

  public formatDateBr(date: string): string {
    return date.substring(8, 10) + '/' + date.substring(5, 7) + '/' + date.substring(0, 4)
  }

  public isEnabledToEdit(leitura): boolean {
    return new Date(leitura.datavencimento) > new Date()
  }
}