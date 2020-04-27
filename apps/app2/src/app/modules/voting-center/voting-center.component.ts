import { Component, OnInit } from '@angular/core';
import { VotingService } from '../../services/election.service';
import { VotingElection } from '../../interfaces/votingElection.interface';
import { Observable } from 'rxjs';

interface PositionPayload {
  id: string;
  title: string;
  candidates: {
    id: string;
    name: string;
    dob: string;
    nickname: string;
    gender: string;
    photo: string;
    room: string;
    choosen?: boolean;
  }[];
  cast: boolean;
}

interface ElectionPayload {
  id: string;
  title: string;
  school: string;
  positionArray?: PositionPayload[];
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app2-voting-center',
  templateUrl: './voting-center.component.html',
  styleUrls: ['./voting-center.component.scss']
})
export class VotingCenterComponent implements OnInit {
  votingData$: Observable<VotingElection>;
  candidateIndex: number;
  isChoice: boolean;

  constructor(private votingService: VotingService) {}

  ngOnInit() {
    this.votingData$ = this.votingService.votingPayload;
  }

  vote(
    election: string,
    position: string,
    candidate: string,
    cast_type: 'yes' | 'no' | 'thumbs'
  ) {
    // find positionIndex from position submitted;
    // const positionIndex = this.electionData.positionArray.findIndex(
    //   p => p.id === position
    // );
    // let candidateIndex: number;
    // if (positionIndex >= 0) {
    //   //update position cast
    //   this.electionData.positionArray[positionIndex].cast = true;
    //   //find candidateIndex and update it
    //   candidateIndex = this.electionData.positionArray[
    //     positionIndex
    //   ].candidates.findIndex(c => c.id === candidate);
    //   if (candidateIndex >= 0) {
    //     this.electionData.positionArray[positionIndex].candidates[
    //       candidateIndex
    //     ].choosen = true;
    //     this.electionData.positionArray[positionIndex].candidates[
    //       candidateIndex
    //     ].voteType = cast_type;
    //   }
    // }
  }
}
