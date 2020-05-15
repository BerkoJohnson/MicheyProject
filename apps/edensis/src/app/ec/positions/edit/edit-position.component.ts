import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ValidationMessage } from '../../../interfaces/validation-messages';
import { PositionValidation } from '../../validations/position.validation';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'edit-position',
  templateUrl: './edit-position.component.html',
  styleUrls: ['./edit-position.component.scss']
})
export class EditPositionComponent implements OnInit {
  positionForm: FormGroup;
  validationMessages: ValidationMessage;

  constructor(private fb: FormBuilder) {
    this.positionForm = this.fb.group({
      title: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[a-zA-Z ]+$/)
        ])
      ]
    });
  }
  ngOnInit() {
    this.validationMessages = PositionValidation;
  }

  submitForm() {
    if (this.positionForm.invalid) {
      return;
    }
  }

  get title() {
    return this.positionForm.get('title');
  }
}
