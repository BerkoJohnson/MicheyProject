import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Election } from '../../../interfaces';
import { Store } from '@ngrx/store';
import { ElectionState } from '../../store/election.reducer';
import { addElection } from '../../store/election.actions';
import IElection from '../../../models/election.model';
import { ValidationMessage } from '../../../interfaces/validation-messages';
import { electionValidation } from '../../validations/election.validation';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'new-election',
  templateUrl: './election-new.component.html',
  styleUrls: ['./election-new.component.scss']
})
export class NewElectionComponent implements OnInit, OnDestroy {
  electionForm: FormGroup;
  validationMessages: ValidationMessage;

  @Output() submitElection = new EventEmitter<Election>();

  constructor(private fb: FormBuilder, private store: Store<ElectionState>) {
    this.electionForm = this.fb.group({
      title: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9 ]+$/)
        ])
      ],
      school: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[a-zA-Z ]+$/)
        ])
      ],
      academicYear: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/20[0-9]{2}\/20[0-9]{2}/)
        ])
      ]
    });
  }
  ngOnInit() {
    this.validationMessages = electionValidation;
  }
  ngOnDestroy() {}

  submitForm() {
    if (this.electionForm.invalid) {
      return;
    }

    const elec: IElection = {
      title: this.title.value,
      school: this.school.value,
      academicYear: this.academicYear.value
    };

    this.store.dispatch(
      addElection({
        election: elec
      })
    );
  }

  get title() {
    return this.electionForm.get('title');
  }

  get school() {
    return this.electionForm.get('school');
  }
  get academicYear() {
    return this.electionForm.get('academicYear');
  }
}
