import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'tail-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isOpen = false;
  showMenu = true;
  isLoggedIn: boolean;

  showNav() {
    this.isOpen = !this.isOpen;
    this.showMenu = !this.showMenu;
  }
  
  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

}
