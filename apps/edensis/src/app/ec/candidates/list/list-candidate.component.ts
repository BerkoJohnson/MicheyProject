import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import ICandidate from '../../../models/candidate.model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'list-candidates',
  templateUrl: './list-candidate.component.html',
  styleUrls: ['./list-candidate.component.scss']
})
export class ListCandidateComponent implements OnInit {
  @Input() candidates: ICandidate[];

  constructor() {}

  ngOnInit() {}
}
