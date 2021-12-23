import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserParams } from '../../../model/user.model';
import { UserService } from '../../../service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './list-user.component.html',
  styleUrls: ['../../../../assets/css/default.scss']
})
export class ListUserComponent implements OnInit {
  users = null

  constructor(private userService: UserService) { 
  }

  ngOnInit(): void {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users
    })
  }

  delete(id: string) {
    const user = this.users.filter(user => user._id === id)
    user.isDeleting = true

    this.userService.delete(id).pipe(first()).subscribe(() => {
      this.users = this.users.filter(user => user._id !== id)
    })
  }
}
