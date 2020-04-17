import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Election, Position } from '../../interfaces/all';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ElectionService, PositionService } from '../../services';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.scss']
})
export class PositionsComponent implements OnInit {
  currentElection: Election;
  positionForm: FormGroup;
  isEdit = false;
  positionToUpdate: Position;

  errors: string;
  info: string;

  constructor(
    private fb: FormBuilder,
    public electionService: ElectionService,
    public positionSrv: PositionService
  ) {
    this.positionForm = this.fb.group({
      title: ['', [Validators.required]],
      election: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  useElection(election: Election) {
    this.currentElection = election;
    this.electionService.setElection(election);
  }

  editPosition(position: Position, electionID: string) {
    // Set isEdit to true
    this.isEdit = true;

    this.election.setValue(electionID);
    if (position) {
      this.positionToUpdate = position;
      this.title.setValue(position.title);
    }
  }

  removePosition(position: string) {
    this.positionSrv.deletePosition(position).subscribe();
  }

  addPosition() {
    this.isEdit = false;
    this.election.setValue(this.currentElection._id || '');
    this.title.setValue(null);
  }

  submitForm() {
    if (this.positionForm.invalid) {
      return;
    }

    const pos: Position = {
      title: this.title.value,
      election: this.election.value
    };

    if (!this.isEdit) {
      this.positionSrv.createPosition(pos, this.election.value).subscribe(
        c => {
          this.errors = '';
          this.info = 'New Position Successfully Added';
          this.positionForm.reset({ election: this.election.value });
        },
        (error: HttpErrorResponse) => {
          // tslint:disable-next-line: no-string-literal
          this.info = '';
          this.errors = error.error['error'];
        }
      );
    } else {
      this.positionSrv
        .updatePosition(this.positionToUpdate._id, this.election.value)
        .subscribe(
          () => {
            this.errors = '';
            this.info = 'Position Successfully Updated';
          },
          (error: HttpErrorResponse) => {
            // tslint:disable-next-line: no-string-literal
            this.info = '';
            this.errors = error.error['error'];
          }
        );
    }
  }

  get title() {
    return this.positionForm.get('title');
  }

  get election() {
    return this.positionForm.get('election');
  }
}
