import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tail-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  inputStyles =
    'border shadow appearance-none w-full rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-gray-700 text-sm';
  invalidInputStyles = 'border-red-500 text-red-400';
  form: FormGroup;

  submit() {
    if (this.form.invalid) return;
    this.authService
      .login(this.username.value, this.password.value)
      .subscribe((data) => {
        const { returnUrl } = this.activatedRoute.snapshot.queryParams;
        this.router.navigateByUrl(returnUrl || '/produts');
      });
  }

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  ngOnInit(): void {}
}
