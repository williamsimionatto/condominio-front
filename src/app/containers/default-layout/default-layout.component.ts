import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../service';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;

  constructor(private localStorageService: LocalStorageService, private router: Router) { }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout() {
    this.localStorageService.removeItem('token');
    this.router.navigate(['/login']);
  }
}
