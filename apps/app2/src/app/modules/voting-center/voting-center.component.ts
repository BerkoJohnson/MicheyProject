import { Component, OnInit } from '@angular/core';
import { VotingService } from '../../services/election.service';
import { VotingElection } from '../../interfaces/votingElection.interface';
import { Socket } from 'ngx-socket-io';
import { ActivatedRoute } from '@angular/router';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app2-voting-center',
  templateUrl: './voting-center.component.html',
  styleUrls: ['./voting-center.component.scss']
})
export class VotingCenterComponent implements OnInit {
  votingData: VotingElection;
  candidateIndex: number;
  isChoice: boolean;
  data: {}[];
  currentPosition: string;

  constructor(
    public votingService: VotingService,
    private socket: Socket,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(p => (this.currentPosition = p.id));
    this.socket.fromEvent<any>('results').subscribe(d => console.log(d));
    this.votingService.votingPayload$.subscribe(ve => (this.votingData = ve));
  }

  nameFormat(name: string) {
    const n = name.split(' ');
    let nameStr = '';
    if (n.length >= 3) {
      nameStr += n[0];
      nameStr += ` ${n[1].split('')[0]}. `;
      nameStr += n[2];
      return nameStr;
    }

    return name;
  }

  vote(
    position: string,
    candidate: string,
    cast_type: 'yes' | 'no' | 'thumbs'
  ) {
    this.socket.emit('vote this', {
      position: position,
      candidate: candidate,
      vtype: cast_type
    });
  }
}
