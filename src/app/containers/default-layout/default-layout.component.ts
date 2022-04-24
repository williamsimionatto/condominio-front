import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { UserParamsAuth } from '../../model/user.model';
import { LocalStorageService } from '../../service';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = true;
  public navItems = navItems;
  public user: UserParamsAuth;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    this.user = JSON.parse(this.localStorageService.getItem('user'));
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  redirectToChangePassword() {
    this.router.navigate([`/usuario/password/${this.user.id}`]);
  }

  logout() {
    this.localStorageService.clear();

    this.router.navigate(['/login']);
  }
}
