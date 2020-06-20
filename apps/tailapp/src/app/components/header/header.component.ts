import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tail-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isOpen = false;
  showMenu = true;

  showNav() {
    this.isOpen = !this.isOpen;
    this.showMenu = !this.showMenu;
  }


  constructor() { }

  ngOnInit(): void {
  }

}
