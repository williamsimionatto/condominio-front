import { INavData } from '@coreui/angular';

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
        icon: 'fa fa-building'
      },
      {
        name: 'Perfil',
        url: '/perfil',
        icon: 'fa fa-user'
      },
      {
        name: 'Permissão',
        url: '/permissao',
        icon: 'fa fa-lock'
      },
      {
        name: 'Usuários',
        url: '/usuario',
        icon: 'fa fa-users'
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
        icon: 'fa fa-tint'
      }
    ]
  },
  {
    name: 'Relatórios',
    url: '/relatorio',
    icon: 'fa fa-search',
    children: [
      {
        name: 'Dashboard',
        url: '/dashboard',
        icon: 'icon-speedometer'
      }
    ]
  }
];
