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
        name: 'Usários',
        url: '/usuarios',
        icon: 'icon-user'
      },
      {
        name: 'Usários Disabled',
        url: '/usuarios',
        icon: 'icon-user',
        attributes: { disabled: true }
      }
    ]
  },
  {
    name: 'Tarefas',
    url: '/tarefa',
    icon: 'fa fa-wrench',
    children: []
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
