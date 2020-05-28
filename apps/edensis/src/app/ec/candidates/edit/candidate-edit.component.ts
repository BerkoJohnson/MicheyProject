import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import IElection from '../../../models/election.model';
import ICandidate from '../../../models/candidate.model';

import { Location } from '@angular/common';
import { ValidationMessage } from '../../../interfaces/validation-messages';
import { CandidateValidation } from '../../validations/candidate.validation';
import {
  getSelectedElection,
  getSelectedCandidate,
  selectPositions
} from '../../../store/reducers';
import IPosition from '../../../models/position.model';
import { DialogService } from '../../../services';
import { updateCandidate } from '../../../store/actions/candidate.actions';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'edit-candidate',
  templateUrl: './candidate-edit.component.html',
  styleUrls: ['./candidate-edit.component.scss']
})
export class EditCandidateComponent implements OnInit {
  imageUrl: any;
  candidateImg: any;
  imageError: string;
  image: string | File;
  errors: string;
  info: string;
  form: FormGroup;
  isSubmitted = false;

  validationMessages: ValidationMessage;
  isChangedPosition = false;

  currentCandidate$: Observable<ICandidate>;
  currentElection$: Observable<IElection>;
  positions$: Observable<IPosition[]>;
  details: ICandidate;
  isImageChanged = false;

  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    private location: Location,
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
      photo: [null]
    });
  }

  goback() {
    this.location.back();
  }

  ngOnInit() {
    this.positions$ = this.store.select(selectPositions);
    this.currentElection$ = this.store.select(getSelectedElection);
    this.currentCandidate$ = this.store.select(getSelectedCandidate);
    this.validationMessages = CandidateValidation;

    this.buildUpdateForm();

    const { photo, ...otherDetails } = this.details;
    this.imageUrl = `data:image/jpg;base64,${photo}`;
    this.form.patchValue(otherDetails);
  }

  buildUpdateForm() {
    this.currentCandidate$.subscribe(c => {
      this.details = c;
    });
  }

  submit(c: string) {
    if (this.form.invalid) {
      this.errors = 'All fields are required.';
    } else {
      // changes
      const changes = new FormData();

      // tslint:disable-next-line: forin
      for (const field in this.f) {
        if (this.form.get(field).dirty && this.form.get(field).touched) {
          if (field !== 'photo') {
            changes.append(field, this.f[field]);
          } else {
            changes.append('photo', this.image);
          }
        }
      }

      const update = {
        id: c,
        changes: changes
      };

      // Submit Update
      this.store.dispatch(updateCandidate({ payload: update }));
      this.isSubmitted = true;
    }
  }

  get f() {
    return this.form.value;
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

  changePosition(checked: boolean) {
    if (checked === true) {
      this.form.get('position').enable({
        onlySelf: true,
        emitEvent: true
      });
    } else {
      this.form.get('position').disable({
        onlySelf: true,
        emitEvent: true
      });
    }
  }

  onAddNewCandidate() {
    // this.addNewCandidate.emit();
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
