import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

import { AuthService } from "../../services/auth.service";
import { HistoryService } from "../../services/history.service";

@Component({
  selector: "annex-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errors = "";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private history: HistoryService
  ) {
    this.loginForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    // console.log(this.history.getLastNonLoginUrl());
  }

  submitForm() {
    if (!this.f.email || !this.f.password) {
      this.errors = "All fields are required";
    } else {
      this.auth
        .login({ email: this.f.email, password: this.f.password })
        .subscribe(
          p => {
            const returnUrl = this.route.snapshot.queryParams['returnUrl'];
            this.router.navigateByUrl(returnUrl);
          },
          (error: HttpErrorResponse) => {
            this.errors = error.error.message;
          }
        );
    }
  }

  get f() {
    return this.loginForm.value;
  }
}
