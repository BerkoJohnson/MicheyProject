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
      name: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      nickname: ['', [Validators.required]],
      position: ['', [Validators.required]],
      photo: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(p =>
      this.store.dispatch(loadCandidate({ candidate: p['cid'] }))
    );
    this.currentElection$ = this.store.select(selectedElection);

    this.currentCandidate$ = this.store.select(CurrentCandidate);
    this.buildUpdateForm();
  }

  buildUpdateForm() {
    this.currentCandidate$.subscribe(c => {
      this.form = this.fb.group({
        room: [c.room, [Validators.required]],
        name: [c.name, [Validators.required]],
        dob: [c.dob, [Validators.required]],
        gender: [c.gender, [Validators.required]],
        nickname: [c.nickname, [Validators.required]],
        position: [{ value: null, disabled: true }, [Validators.required]],
        photo: [null, [Validators.required]]
      });
      this.imageUrl = `data:image/jpg;base64,${c.photo}`;
    });
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
      formData.append('photo', this.image);

      if (this.isChangedPosition !== false) {
        formData.append('position', this.position.value);

        // submit update data
      }
    }
  }

  get position() {
    return this.form.get('position');
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
}
