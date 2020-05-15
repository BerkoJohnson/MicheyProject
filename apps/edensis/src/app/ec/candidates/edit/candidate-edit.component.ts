import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import IElection from '../../../models/election.model';
import { Store } from '@ngrx/store';
import { ElectionState } from '../../store/election.reducer';
import ICandidate from '../../../models/candidate.model';
import { ActivatedRoute } from '@angular/router';
import { loadCandidate } from '../../store/election.actions';
import {
  CurrentCandidate,
  selectedElection
} from '../../store/election.selector';
import { ValidationMessage } from '../../../interfaces/validation-messages';
import { CandidateValidation } from '../../validations/candidate.validation';

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

  validationMessages: ValidationMessage;
  isChangedPosition = false;

  currentCandidate$: Observable<ICandidate>;
  currentElection$: Observable<IElection>;

  isImageChanged = false;

  constructor(
    private fb: FormBuilder,
    private store: Store<ElectionState>,
    private route: ActivatedRoute
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

  ngOnInit() {
    this.currentElection$ = this.store.select(selectedElection);

    this.currentCandidate$ = this.store.select(CurrentCandidate);
    this.buildUpdateForm();
    this.validationMessages = CandidateValidation;
  }

  buildUpdateForm() {
    this.currentCandidate$.subscribe(c => {
      this.form.patchValue({
        room: c?.room || null,
        name: c?.name || null,
        dob: c?.dob || null,
        gender: c?.gender || null,
        nickname: c?.nickname || null,
        position: c?.position || null,
        photo: null
      });
      this.imageUrl = `data:image/jpg;base64,${c?.photo}`;
      this.form.get('position').disable({
        onlySelf: true,
        emitEvent: true
      });
    });
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
      formData.append('photo', this.image);

      if (this.isChangedPosition !== false) {
        formData.append('position', this.position.value);

        // submit update data
      }
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
}
