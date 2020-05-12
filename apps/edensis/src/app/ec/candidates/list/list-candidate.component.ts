import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CandidateService, ElectionService } from '../../../services';
import { Candidate } from '../../../interfaces';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'list-candidates',
  templateUrl: './list-candidate.component.html',
  styleUrls: ['./list-candidate.component.scss']
})
export class ListCandidateComponent implements OnInit {
  @Output() selectCandidate = new EventEmitter<Candidate>();
  @Output() removeCandidate = new EventEmitter<string>();
  @Output() editCandidate = new EventEmitter<Candidate>();

  constructor(
    public candidateService: CandidateService,
    public electionService: ElectionService
  ) {}

  ngOnInit() {}

  onSelectedCandidate(candidate: Candidate) {
    this.selectCandidate.emit(candidate);
  }

  onRemoveCandidate(candidateId: string) {
    this.removeCandidate.emit(candidateId);
  }

  onEditCandidate(candidate: Candidate) {
    this.editCandidate.emit(candidate);
  }
}
