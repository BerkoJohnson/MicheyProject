import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'edit-position',
  templateUrl: './edit-position.component.html',
  styleUrls: ['./edit-position.component.scss']
})
export class EditPositionComponent implements OnInit {
  positionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.positionForm = this.fb.group({
      title: ['', [Validators.required]]
    });
  }
  ngOnInit() {}

  submitForm() {
    if (this.positionForm.invalid) {
      return;
    }
  }
}
