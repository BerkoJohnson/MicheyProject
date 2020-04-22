import { Component, OnInit } from '@angular/core';

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
    if (user === this.currentUser) return true;
  }

  deleteUser(i: number) {
    this.users.splice(i, 1);
  }
  constructor() {}

  ngOnInit(): void {}
}
