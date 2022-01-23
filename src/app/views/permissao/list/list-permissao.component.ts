import { Component, OnInit } from "@angular/core";
import { first } from "rxjs/operators";
import swal from "sweetalert";
import { NotificationService } from "../../../service/notification/notification.service";
import { PermissaoService } from "../../../service/permissao/permissao.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './list-permissao.component.html',
  styleUrls: ['../../../../assets/css/default.scss']
})
export class ListPermissaoComponent implements OnInit {
  permissoes = null

  constructor(
    private permissaoService: PermissaoService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.permissaoService.getAll().pipe(first()).subscribe(permissoes => {
      this.permissoes = permissoes
    })
  }

  delete(permissaoParams) {
    swal({
      text: "Deseja realmente excluir este registro?",
      icon: "warning",
      dangerMode: true,
      buttons: ["Não", "Sim"]
    }).then((willDelete) => {
      if (willDelete) {
        const permissao = this.permissoes.filter(permissao => permissao.id === permissaoParams.id)
        permissao.isDeleting = true

        this.permissaoService.delete(permissaoParams.id)
          .subscribe(
            results => {
              this.notificationService.showSuccess('Registro excluído com sucesso!', 'Sucesso')
              this.permissoes.splice(this.permissoes.indexOf(permissaoParams), 1);   
            },
            error => {
              permissao.isDeleting = false
              this.notificationService.showError('Não é possível excluir este registro', 'Erro')
            }
          )
      }
    }).catch(() => {
      this.notificationService.showError('Não foi possível excluir o registro!', 'Erro')
    })
  }
}