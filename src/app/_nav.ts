import { INavData } from '@coreui/angular';
import { LocalStorageService } from './service';
import { PermissionsService } from './service/permissions/permissions.service';

function isDisabled(sigla: string) {
  const permissionsService = new PermissionsService(new LocalStorageService());
  return !permissionsService.hasPermission(sigla, 'consultar');
}

export const navItems: INavData[] = [
  {
    name: 'Ínicio',
    url: '/',
    icon: 'icon-home'
  },
  {
    name: 'Cadastros',
    url: '/cadastro',
    icon: 'fa fa-edit',
    children: [
      {
        name: 'Condomínio',
        url: '/condominio',
        icon: 'fa fa-building',
        attributes: { disabled: isDisabled('CAD_CONDOMINIO'), id: 'nav-cad-condominio'  },
      }, 
      {
        name: 'Perfil',
        url: '/perfil',
        icon: 'fa fa-user',
        attributes: { disabled: isDisabled('CAD_PERFIL'), id: 'nav-cad-perfil' },
      },
      {
        name: 'Período',
        url: '/periodo',
        icon: 'fa fa-calendar',
        attributes: { disabled: isDisabled('CAD_PERIODO'), id: 'nav-cad-periodo' },
      },
      {
        name: 'Permissão',
        url: '/permissao',
        icon: 'fa fa-lock',
        attributes: { disabled: isDisabled('CAD_PERMISSAO'), id: 'nav-cad-permissao'  },
      },
      {
        name: 'Usuários',
        url: '/usuario',
        icon: 'fa fa-users',
        attributes: { disabled: isDisabled('CAD_USUARIO'), id: 'nav-cad-usuario'  },
      }
    ]
  },
  {
    name: 'Tarefas',
    url: '/tarefa',
    icon: 'fa fa-wrench',
    children: [
      {
        name: 'Leitura d`água',
        url: '/leituraagua',
        icon: 'fa fa-tint',
        attributes: { disabled: isDisabled('TAR_LEITURAAGUA'), id: 'nav-tar-leitura'  },
      }
    ]
  },
  {
    name: 'Relatórios',
    url: '/relatorio',
    icon: 'fa fa-search',
    children: [
      {
        name: 'Leitura d`água',
        url: '/report/leituraagua',
        icon: 'fa fa-tint',
        attributes: { disabled: isDisabled('REL_LEITURAAGUA'), id: 'nav-rel-leitura'  },
      }
    ]
  }
];
