import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { PerfilPermissaoParams } from '../../../model/perfilpermissao.model';
import { UserParamsAuth } from '../../../model/user.model';
import { NotificationService } from '../../../service/notification/notification.service';
import { PerfilService } from '../../../service/perfil/perfil.service';
import { PerfilPermissaoService } from '../../../service/perfilpermissao/perfilpermissao.service';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-list-permissao',
  templateUrl: './permissao.component.html',
  styleUrls: ['../../../../assets/css/default.scss']
})
export class PermissaoComponent extends BaseComponent implements OnInit {
  permissoesPerfil: PerfilPermissaoParams[]
  perfilPermissaoForm: FormGroup;
  perfil: any = {};
  permissaoName: string;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private perfilPermissaoService: PerfilPermissaoService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    private perfilService: PerfilService,
  ) {
    super('CAD_PERFILPERMISSAO');
  }

  ngOnInit(): void {
    if (!(this.canOverview() || this.canEdit())) {
      this.router.navigate(['/not-found']);
    }

    let id = this.route.snapshot.params['id'];
    this.perfil.id = id;
    this.perfilPermissaoForm = this.formBuilder.group({});

    this.setNomePerfil(this.perfil.id)

    this.perfilPermissaoService
      .getByPerfil(this.perfil.id)
      .pipe(first())
      .subscribe(x => {
        this.permissoesPerfil = x
        this.permissaoName = x[0].name
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    let data: any = {}
    this.permissoesPerfil.forEach((x, index)=> {
      data[index] = {
        perfil: this.perfil.id,
        permissoes: {
          permissao: x.id,
          consultar: x.consultar,
          inserir: x.inserir,
          alterar: x.alterar,
          excluir: x.excluir,
        }
      }
    })

    this.save(data)
  }

  save (data: any): boolean {
    let erro = true
    this.perfilPermissaoService.save(data).pipe(first()).subscribe(
      data => {
        this.notificationService.showSuccess('Permissões atualizadas com sucesso!', 'Sucesso')
        this.loading = false;
        this.router.navigate(['/perfil']);
      },
      error => {
        console.log(error)
        this.notificationService.showError('Aconteceu erro ao salvar as permissões', 'Erro')
        this.loading = false;
      }
    );

    return erro
  }

  checkAllByPermissao(event, id: number) {
    let permissao = this.permissoesPerfil.find(x => x.id == id)
    permissao.consultar = event.target.checked ? 'S' : 'N'
    permissao.inserir = event.target.checked ? 'S' : 'N'
    permissao.alterar = event.target.checked ? 'S' : 'N'
    permissao.excluir = event.target.checked ? 'S' : 'N'
  }

  checkAllByTipoPermissao(event, tipo: string) {
    this.permissoesPerfil.forEach(x => {
      x[tipo] = event.target.checked ? 'S' : 'N'
    })
  }

  changePermission(event, permission: PerfilPermissaoParams, tipo: string) {
    let permissao = this.permissoesPerfil.find(x => x.id == permission.id)
    permissao[tipo] = event.target.checked ? 'S' : 'N'
  }

  setNomePerfil(id: string) {
    this.perfilService.getById(id).pipe(first()).subscribe(
      data => {
        this.perfil.name = data.name;
      }
    );
  }
}
