import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ElectionState } from '../../store/election.reducer';
import { addElection } from '../../store/election.actions';
import IElection from '../../../models/election.model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'edit-election',
  templateUrl: './election-edit.component.html',
  styleUrls: ['./election-edit.component.scss']
})
export class EditElectionComponent implements OnInit, OnDestroy {
  electionForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<ElectionState>) {
    this.electionForm = this.fb.group({
      title: ['', Validators.required],
      school: ['', Validators.required],
      academicYear: ['', Validators.required]
    });
  }
  ngOnInit() {}
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
