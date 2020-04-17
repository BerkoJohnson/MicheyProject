import { Component, OnInit } from "@angular/core";
import { ElectionService } from "../../services/election.service";

interface PositionPayload {
  id: string;
  title: string;
  type: "Thumbs" | "Yes/No";
  candidates: {
    id: string;
    name: string;
    dob: string;
    nickname: string;
    gender: "Male" | "Female";
    photo: string;
    room: string;
    choosen?: boolean;
    voteType?: "yes" | "no" | "thumbs";
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
  selector: "app2-voting-center",
  templateUrl: "./voting-center.component.html",
  styleUrls: ["./voting-center.component.scss"]
})
export class VotingCenterComponent implements OnInit {
  electionData: ElectionPayload;
  // election: ElectionPayload;
  candidateIndex: number;
  isChoice: boolean;

  constructor(private electionSrv: ElectionService) {}

  ngOnInit() {
    this.electionSrv.getElection("5e7867cfea2d9a29d59442df").subscribe(e => {
      // setup the election details
      // setup the included positions and then their candidates too
      const positionsArray = e.data.positions.map(p => {
        let candidates = p.candidates.map(c => {
          return {
            id: c._id,
            name: c.name,
            dob: c.dob,
            gender: c.gender,
            room: c.room,
            nickname: c.nickname,
            photo: c.photo
          };
        });

        return {
          id: p._id,
          title: p.title,
          type: p.cast_type,
          candidates,
          cast: false
        };
      });

      this.electionData = {
        id: e.data._id,
        title: e.data.title,
        school: e.data.school,
        positionArray: positionsArray
      };
    });
  }

  vote(
    election: string,
    position: string,
    candidate: string,
    cast_type: "yes" | "no" | "thumbs"
  ) {
    // find positionIndex from position submitted;

    let positionIndex = this.electionData.positionArray.findIndex(
      p => p.id === position
    );
    let candidateIndex: number;
    if (positionIndex >= 0) {
      //update position cast
      this.electionData.positionArray[positionIndex].cast = true;

      //find candidateIndex and update it
      candidateIndex = this.electionData.positionArray[
        positionIndex
      ].candidates.findIndex(c => c.id === candidate);
      if (candidateIndex >= 0) {
        this.electionData.positionArray[positionIndex].candidates[
          candidateIndex
        ].choosen = true;
        this.electionData.positionArray[positionIndex].candidates[
          candidateIndex
        ].voteType = cast_type;
      }
    }

    // console.log(
    //   this.electionData.positionArray[positionIndex].candidates[candidateIndex]
    // );
  }
}
