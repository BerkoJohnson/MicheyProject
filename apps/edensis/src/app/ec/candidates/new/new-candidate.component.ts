import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import IElection from '../../../models/election.model';
import IPosition from '../../../models/position.model';
import { ValidationMessage } from '../../../interfaces/validation-messages';
import { CandidateValidation } from '../../validations/candidate.validation';
import {
  getSelectedElection,
  getSelectedPosition,
  selectPositions,
  getSelectedElectionID
} from '../../../store/reducers';
import { addCandidate } from '../../../store/actions/candidate.actions';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { DialogService } from '../../../services';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'new-candidate',
  templateUrl: './new-candidate.component.html',
  styleUrls: ['./new-candidate.component.scss']
})
export class NewCandidateComponent implements OnInit {
  currentElection: string;
  currentPosition$: Observable<IPosition>;
  imageUrl: any;
  candidateImg: any;
  imageError: string;
  image: File;
  errors: string;
  info: string;
  form: FormGroup;
  validationMessages: ValidationMessage;
  positions$: Observable<IPosition[]>;

  isSubmitted = false;
  isImageChanged = false;

  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    private router: Router,
    private dialogService: DialogService
  ) {
    this.form = this.fb.group({
      room: ['', [Validators.required]],
      name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[a-zA-Z ]+$/)
        ])
      ],
      dob: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      nickname: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9 ]+$/)
        ])
      ],
      position: ['', [Validators.required]],
      photo: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.store
      .select(getSelectedElectionID)
      .subscribe(x => (this.currentElection = x));

    this.currentPosition$ = this.store.select(getSelectedPosition);

    this.currentPosition$.subscribe(p => {
      if (p) this.position.setValue(p?._id);
    });
    this.validationMessages = CandidateValidation;

    this.positions$ = this.store.select(selectPositions);
  }

  submit() {
    if (this.form.invalid) {
      this.errors = 'All fields are required.';
    } else {
      const formData = new FormData();
      formData.append('name', this.name.value);
      formData.append('room', this.room.value);
      formData.append('dob', this.dob.value);
      formData.append('gender', this.gender.value);
      formData.append('nickname', this.nickname.value);
      formData.append('position', this.position.value);
      formData.append('photo', this.image);

      // Submit Data
      this.store.dispatch(addCandidate({ candidate: formData }));
      this.isSubmitted = true;
      setTimeout(
        () =>
          this.router.navigate([
            'ec',
            'elections',
            this.currentElection,
            'view-position'
          ]),
        100
      );
    }
  }

  previewImage(event: Event) {
    // tslint:disable-next-line:no-string-literal
    const file = event.target['files'][0] as File;
    if (!file) {
      return;
    }
    this.isImageChanged = true;
    // Validate file input
    const mimetype = file.type;
    if (mimetype.match(/image\/*/) === null) {
      this.imageError = 'Only images are supported!';
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = e => {
      this.imageUrl = reader.result;
      this.image = file;
    };
  }

  get name() {
    return this.form.get('name');
  }
  get room() {
    return this.form.get('room');
  }
  get nickname() {
    return this.form.get('nickname');
  }
  get position() {
    return this.form.get('position');
  }
  get photo() {
    return this.form.get('photo');
  }
  get gender() {
    return this.form.get('gender');
  }
  get dob() {
    return this.form.get('dob');
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.form.dirty && this.form.touched && !this.isSubmitted) {
      return this.dialogService.confirm('Discard changes for this candidate?');
    }
    return true;
  }
}
