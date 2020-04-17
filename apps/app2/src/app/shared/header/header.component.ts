import { Component, OnInit } from "@angular/core";import { AuthService } from '../../services/auth.service';
;

@Component({
  selector: "app2-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit(): void {}
}
