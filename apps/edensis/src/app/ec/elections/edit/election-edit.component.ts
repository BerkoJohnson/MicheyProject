import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import IElection from '../../../models/election.model';
import { electionValidation } from '../../validations/election.validation';
import { ValidationMessage } from '../../../interfaces/validation-messages';
import {
  addElection,
  updateElection
} from '../../../store/actions/election.actions';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { getSelectedElection } from '../../../store/reducers';
import { UpdateStr, Update } from '@ngrx/entity/src/models';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'edit-election',
  templateUrl: './election-edit.component.html',
  styleUrls: ['./election-edit.component.scss']
})
export class EditElectionComponent implements OnInit {
  electionForm: FormGroup;
  validationMessages: ValidationMessage;
  currentElection$: Observable<IElection>;
  election: IElection;

  constructor(private fb: FormBuilder, private store: Store<any>) {
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
    this.store.select(getSelectedElection).subscribe(x => {
      this.election = x;
      this.electionForm.patchValue(x);
    });
    this.validationMessages = electionValidation;
  }

  submitForm() {
    if (this.electionForm.invalid) {
      return;
    }

    const changes = {};
    // tslint:disable-next-line: forin
    for (const field in this.electionForm.value) {
      if (
        this.electionForm.get(field).dirty &&
        this.electionForm.get(field).touched
      ) {
        changes[field] = this.electionForm.value[field];
      }
    }

    const update = {
      id: this.election._id,
      update: changes
    };

    // console.log(update);
    this.store.dispatch(updateElection(update));
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
