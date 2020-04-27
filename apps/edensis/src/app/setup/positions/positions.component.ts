import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Election, Position, Candidate } from '../../interfaces';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ElectionService, PositionService } from '../../services';
import { Router } from '@angular/router';

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
    public positionSrv: PositionService,
    private router: Router
  ) {
    this.positionForm = this.fb.group({
      title: ['', [Validators.required]]
    });
    this.positionSrv.loadPositions();
  }

  ngOnInit(): void {
    this.electionService.election$.subscribe(e => {
      if (e === null) {
        this.router.navigate(['elections'], {
          queryParams: { returnUrl: 'positions' }
        });
      }
    });
  }

  useElection(election: Election) {
    this.currentElection = election;
    this.electionService.setElection(election);
  }

  editPosition(position: Position, electionID: string) {
    // Set isEdit to true
    this.isEdit = true;
    if (position) {
      this.positionToUpdate = position;
      this.title.setValue(position.title);
    }
  }

  removePosition(position: string, candidates: Candidate[]) {
    let str = '';
    candidates.forEach(c => (str += c.name + '\n'));
    const deleted = window.confirm(
      `The following ${
        candidates.length === 1 ? 'candidate' : 'candidates'
      } assigned will be removed too.\n ${str}Do you still want to remove this position?`
    );
    if (deleted) {
      this.positionSrv.deletePosition(position).subscribe();
    }
  }

  addPosition() {
    this.isEdit = false;
    this.title.setValue(null);
  }

  submitForm() {
    if (this.positionForm.invalid) {
      return;
    }

    const pos = {
      title: this.title.value
    } as Position;

    if (!this.isEdit) {
      this.positionSrv.createPosition(pos).subscribe(
        c => {
          this.errors = '';
          this.info = 'New Position Successfully Added';
        },
        (error: HttpErrorResponse) => {
          // tslint:disable-next-line: no-string-literal
          this.info = '';
          this.errors = error.error['error'];
        }
      );
    } else {
      this.positionSrv.updatePosition(this.positionToUpdate._id, pos).subscribe(
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
