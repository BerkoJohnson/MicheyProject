import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Election, Candidate } from '../../interfaces';
import {
  ElectionService,
  CandidateService,
  PositionService
} from '../../services';
import { Router } from '@angular/router';

interface CanPayload {
  _id: string;
  name: string;
  gender: 'Male' | 'Female';
  dob: string;
  room: string;
  studentID: string;
  nickname: string;
  photo: string;
  position_id: string;
  position_title: string;
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {
  imageUrl: any;
  candidateImg: any;
  imageError: string;
  image: string | File;
  errors: string;
  info: string;
  currentElection: Election;
  form: FormGroup;
  candidates: CanPayload[];
  currentCandidate: Candidate;
  currentPosition: string;
  newPosition: string;

  isEdit = false;
  isImageChanged = false;

  constructor(
    private fb: FormBuilder,
    public electionService: ElectionService,
    public candidateService: CandidateService,
    public positionService: PositionService,
    private router: Router
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
    this.positionService.loadPositions();
    this.candidateService.loadCandidates();
  }

  ngOnInit(): void {
    this.electionService.election$.subscribe(e => {
      if (e === null) {
        this.router.navigate(['elections'], {
          queryParams: { returnUrl: 'candidates' }
        });
      }
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

      if (this.isEdit === false) {
        this.candidateService
          .createCandidate(formData, this.position.value)
          .subscribe(
            c => {
              this.errors = '';
              this.info = 'New Candidate Successfully Added';
              setTimeout(() => this.addCandidate(), 2000);
            },
            (error: HttpErrorResponse) => {
              // tslint:disable-next-line: no-string-literal
              this.info = '';
              this.errors = error.error.error;
            }
          );
      } else {
        formData.append('position', this.position.value);
        this.candidateService
          .updateCandidate(this.currentCandidate._id, formData)
          .subscribe(
            c => {
              this.errors = '';
              this.info = 'Candidate Successfully Updated';
              setTimeout(() => this.addCandidate(), 2000);
            },
            (error: HttpErrorResponse) => {
              // tslint:disable-next-line: no-string-literal
              this.info = '';
              this.errors = error.error.error;
            }
          );
      }
    }
  }

  get position() {
    return this.form.get('position');
  }

  editCandidate(candidate: Candidate) {
    this.isEdit = true;
    this.errors = '';
    this.info = '';

    this.photo.clearValidators();
    this.currentCandidate = candidate;
    this.form.setValue(
      {
        room: candidate.room,
        name: candidate.name,
        dob: candidate.dob,
        gender: candidate.gender,
        nickname: candidate.nickname,
        position: candidate.position._id,
        photo: null
      },
      {
        emitEvent: true,
        onlySelf: true
      }
    );
    this.form.get('position').disable({
      emitEvent: true
    });

    this.imageUrl = `data:image/jpg;base64,${candidate.photo}`;
  }

  addCandidate() {
    this.isEdit = false;
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
    this.currentPosition = '';

    this.form.get('position').enable({
      emitEvent: true
    });
  }

  removeCandidate(candidateID: string) {
    const deleted = window.confirm(
      'Do you want to remove this candidate completely?'
    );
    if (deleted) {
      this.candidateService.deleteCandidate(candidateID).subscribe();
      // this.positionService.loadPositions();
    }
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
}
