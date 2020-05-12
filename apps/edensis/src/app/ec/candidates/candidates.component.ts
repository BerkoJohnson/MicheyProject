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

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {
  errors: string;
  info: string;
  currentElection: Election;
  currentCandidate: Candidate;
  isEdit = false;

  constructor(
    public electionService: ElectionService,
    public candidateService: CandidateService,
    public positionService: PositionService,
    private router: Router
  ) {
    this.candidateService.loadCandidates();
    this.positionService.loadPositions();
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

  onViewCandidate(candidate: Candidate) {
    console.log(candidate);
  }

  onEditCandidate(candidate: Candidate) {
    this.isEdit = true;
    this.currentCandidate = candidate;
  }

  onSubmitCandidate(submitData: FormData) {
    this.candidateService.createCandidate(submitData).subscribe(
      c => {
        this.errors = '';
        this.info = 'New Candidate Successfully Added';
      },
      (error: HttpErrorResponse) => {
        // tslint:disable-next-line: no-string-literal
        this.info = '';
        this.errors = error.error.error;
      }
    );
  }

  onUpdateCandidate(updateData: FormData) {
    this.candidateService
      .updateCandidate(this.currentCandidate._id, updateData)
      .subscribe(
        c => {
          this.errors = '';
          this.info = 'Candidate Successfully Updated';
        },
        (error: HttpErrorResponse) => {
          // tslint:disable-next-line: no-string-literal
          this.info = '';
          this.errors = error.error.error;
        }
      );
  }

  onRemoveCandidate(candidateID: string) {
    const deleted = window.confirm(
      'Do you want to remove this candidate completely?'
    );
    if (deleted) {
      this.candidateService.deleteCandidate(candidateID).subscribe();
    }
  }
}
