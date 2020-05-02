import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { VotingService } from '../../services/election.service';
import { VotingElection } from '../../interfaces/votingElection.interface';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app2-def-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor(public auth: AuthService, public votingService: VotingService) {}
  votingData: VotingElection;

  ngOnInit(): void {
    this.votingService.votingPayload$.subscribe(v => (this.votingData = v));
  }
}
