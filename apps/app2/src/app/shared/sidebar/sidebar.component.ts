import { Component, OnInit } from "@angular/core";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: "app2-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit(): void {}
}
