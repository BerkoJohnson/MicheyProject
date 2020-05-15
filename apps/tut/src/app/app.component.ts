import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'my-web-space-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form: FormGroup;

  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  password: FormControl;
  language: FormControl;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: this.fb.group({
        firstName: '',
        lastName: ''
      }),
      email: '',
      password: '',
      language: ''
    });

    // tslint:disable-next-line: no-unused-expression
    new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/);
  }
}
