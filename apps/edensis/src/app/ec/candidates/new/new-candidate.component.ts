import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Election, Candidate } from '../../../interfaces';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  ElectionService,
  CandidateService,
  PositionService
} from '../../../services';
import { Store } from '@ngrx/store';
import { ElectionState } from '../../store/election.reducer';
import IElection from '../../../models/election.model';
import { Observable } from 'rxjs';
import { selectedElection } from '../../store/election.selector';
import { addCandidate } from '../../store/election.actions';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'new-candidate',
  templateUrl: './new-candidate.component.html',
  styleUrls: ['./new-candidate.component.scss']
})
export class NewCandidateComponent implements OnInit {
  currentElection$: Observable<IElection>;
  imageUrl: any;
  candidateImg: any;
  imageError: string;
  image: string | File;
  errors: string;
  info: string;
  form: FormGroup;

  isImageChanged = false;

  constructor(private fb: FormBuilder, private store: Store<ElectionState>) {
    this.form = this.fb.group({
      room: ['', [Validators.required]],
      name: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      nickname: ['', [Validators.required]],
      position: ['', [Validators.required]],
      photo: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.currentElection$ = this.store.select(selectedElection);
  }

  submit() {
    if (this.form.invalid) {
      this.errors = 'All fields are required.';
    } else {
      const formData = new FormData();
      formData.append('name', this.form.get('name').value);
      formData.append('room', this.form.get('room').value);
      formData.append('dob', this.form.get('dob').value);
      formData.append('gender', this.form.get('gender').value);
      formData.append('nickname', this.form.get('nickname').value);
      formData.append('position', this.position.value);
      formData.append('photo', this.image);

      // Submit Data
      this.store.dispatch(addCandidate({ candidate: formData }));
    }
  }

  get position() {
    return this.form.get('position');
  }

  clearFields() {
    // Reset Form
    this.form.reset({
      room: '',
      name: '',
      dob: '',
      gender: '',
      nickname: '',
      position: '',
      photo: null
    });
    this.imageUrl = '';
    this.info = '';
    this.errors = '';

    this.form.get('position').enable({
      emitEvent: true
    });
  }

  get photo() {
    return this.form.get('photo');
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
}
