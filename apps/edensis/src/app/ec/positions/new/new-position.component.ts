import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ElectionState } from '../../store/election.reducer';
import { addPosition } from '../../store/election.actions';
import { selectedElection } from '../../store/election.selector';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import IElection from '../../../models/election.model';
import IPosition from '../../../models/position.model';
import { electionValidation } from '../../validations/election.validation';
import { ValidationMessage } from '../../../interfaces/validation-messages';
import { PositionValidation } from '../../validations/position.validation';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'new-position',
  templateUrl: './new-position.component.html',
  styleUrls: ['./new-position.component.scss']
})
export class NewPositionComponent implements OnInit {
  positionForm: FormGroup;
  currentElection$: Observable<IElection>;
  validationMessages: ValidationMessage;

  constructor(private fb: FormBuilder, private store: Store<ElectionState>) {
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
    this.currentElection$ = this.store.select(selectedElection);
    this.validationMessages = PositionValidation;
  }

  submitForm(election: string) {
    if (this.positionForm.invalid) {
      return;
    }
    const position: IPosition = {
      title: this.title.value,
      election: election
    };

    this.store.dispatch(addPosition({ position }));
  }

  get title() {
    return this.positionForm.get('title');
  }
}
