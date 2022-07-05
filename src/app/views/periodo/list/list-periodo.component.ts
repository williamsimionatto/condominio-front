import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { first } from "rxjs/operators";
import { UserParamsAuth } from "../../../model/user.model";
import { ConfirmationDialogService } from "../../../service/confirmation-dialog/confirmation-dialog";
import { NotificationService } from "../../../service/notification/notification.service";
import { PeriodService } from "../../../service/period/period.service";
import { BaseComponent } from "../../base.component";

@Component({
  selector: 'app-list-periodo',
  templateUrl: './list-periodo.component.html',
  styleUrls: ['../../../../assets/css/default.scss']
})
export class ListPeriodoComponent extends BaseComponent implements OnInit {
  periodos = null
  user: UserParamsAuth

  constructor(
    private periodoService: PeriodService,
    private router: Router,
    private notificationService: NotificationService,
    private confirmationDialogService: ConfirmationDialogService,
  ) {
    super('CAD_PERIODO');
  }

  ngOnInit() {
    if (!this.canOverview()) {
      this.router.navigate(["/not-found"])
    }

    this.periodoService.getAll().pipe(first()).subscribe(periodos => {
      this.periodos = periodos
    })
  }

  hasPermission(tipo: string): boolean {
    return this.permissions[tipo] === 'S'
  }

  delete(periodoParams) {
    this.confirmationDialogService.confirm('Excluir Período', 'Deseja realmente excluir este perfil? Esta ação não poderá ser desfeita.', 'Excluir', 'Cancelar', "lg")
      .then((confirmed) => {
        if (!confirmed) {
          return;
        }

        const perfil = this.periodos.filter(perfil => perfil.id === periodoParams.id)
        perfil.isDeleting = true
    
        this.periodoService.delete(periodoParams.id).subscribe(
          _results => {
            this.notificationService.showSuccess('Registro excluído com sucesso!', 'Sucesso')
            this.periodos.splice(this.periodos.indexOf(periodoParams), 1);   
          },
          _error => {
            perfil.isDeleting = false
            this.notificationService.showError('Não é possível excluir este Período pois ele está vinculado a outros registros', 'Erro')
          }
        )
      }
    )
  }
}