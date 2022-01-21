import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NotificationService } from "../../../service/notification/notification.service";
import { PerfilService } from "../../../service/perfil/perfil.service";
import swal from 'sweetalert';
import { first } from "rxjs/operators";

@Component({
  selector: 'app-dashboard',
  templateUrl: './list-perfil.component.html',
  styleUrls: ['../../../../assets/css/default.scss']
})
export class ListPerfilComponent implements OnInit {
  perfis = null

  constructor(
    private perfilService: PerfilService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.perfilService.getAll().pipe(first()).subscribe(perfis => {
      this.perfis = perfis
    })
  }

  delete(perfilParams) {
    swal({
      text: "Deseja realmente excluir este registro?",
      icon: "warning",
      dangerMode: true,
      buttons: ["Não", "Sim"]
    }).then((willDelete) => {
      if (willDelete) {
        const perfil = this.perfis.filter(perfil => perfil.id === perfilParams.id)
        perfil.isDeleting = true

        this.perfilService.delete(perfilParams.id).pipe(first()).subscribe(() => {
          this.perfis = this.perfis.filter(perfil => perfil.id !== perfilParams.id)
        })

        this.notificationService.showSuccess('Registro excluído com sucesso!', 'Sucesso')
        this.perfis.splice(this.perfis.indexOf(perfilParams), 1);
      }
    }).catch(() => {
      this.notificationService.showError('Não foi possível excluir o registro!', 'Erro')
    })
  }
}