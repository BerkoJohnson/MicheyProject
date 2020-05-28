import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import IElection from '../../../models/election.model';
import { Observable } from 'rxjs';
import { getSelectedElection } from '../../../store/reducers';

interface PLink {
  title: string;
  value: string;
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'view-election',
  templateUrl: './election-view.component.html',
  styleUrls: ['./election-view.component.scss']
})
export class ViewElectionComponent implements OnInit {
  currentElection$: Observable<IElection>;
  election: IElection;
  pages: PLink[] = [
    { title: 'Add New Position', value: 'add-position' },
    { title: 'Add New Candidate', value: 'add-candidate' },
    { title: 'Update This Election', value: 'edit-election' },
    { title: 'Import Voters', value: 'import-voters' },
    { title: 'List of Voters', value: 'list-voters' }
  ];

  links: PLink[] = [];

  constructor(private store: Store<any>, private router: Router) {}

  ngOnInit() {
    this.store.select(getSelectedElection).subscribe(x => (this.election = x));
    // '/ec/elections/' + election?._id + '/add-candidate';
    this.buildLinks();
  }

  buildLinks() {
    setTimeout(() => {
      for (const page of this.pages) {
        this.links.push({
          title: page.title,
          value: `/ec/elections/${this.election._id}/${page.value}`
        });
      }
    }, 100);
  }

  goto(s: Event) {
    if (!s.target['value']) {
      return;
    }
    const value = s.target['value'];
    this.router.navigateByUrl(value);
  }
}
