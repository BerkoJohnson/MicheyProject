import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadUsersSuccess } from './users.action';

@Component({
  selector: 'my-web-space-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  currentUser: { name: string; email: string };
  users: {
    name: string;
    email: string;
  }[] = [
    {
      name: 'Nana Berko',
      email: 'berko@gmail.com'
    },
    {
      name: 'Frank Boateng',
      email: 'frank@gmail.com'
    },
    {
      name: 'Melvina Aboagyewaa',
      email: 'melvy@gmail.com'
    }
  ];

  onSelectedUser(e) {
    this.currentUser = e;
  }

  isSelected(user: { name: string; email: string }) {
    if (!user) return false;
    return user.email === this.currentUser.email;
  }

  deleteUser(i: number) {
    this.users.splice(i, 1);
  }
  constructor(private store: Store) {
    store.dispatch(LoadUsersSuccess({ users: this.users }));
  }

  ngOnInit(): void {}
}
