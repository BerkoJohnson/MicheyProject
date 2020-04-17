import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Election, Position } from "../../../interfaces";
import { ElectionService } from "../../../services/election.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "annex-positions",
  templateUrl: "./positions.component.html",
  styleUrls: ["./positions.component.scss"]
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
    public electionService: ElectionService
  ) {
    this.positionForm = this.fb.group({
      title: ["", [Validators.required]],
      election: ["", Validators.required]
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

  removePosition(position: string, election: string) {
    this.electionService.deletePosition(position, election).subscribe();
  }

  addPosition() {
    this.isEdit = false;
    this.election.setValue(this.currentElection._id || "");
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
      this.electionService.createPosition(pos, this.election.value).subscribe(
        c => {
          this.errors = "";
          this.info = "New Position Successfully Added";
        },
        (error: HttpErrorResponse) => {
          // tslint:disable-next-line: no-string-literal
          this.info = "";
          this.errors = error.error["error"];
        }
      );
    } else {
      this.electionService
        .updatePosition(this.positionToUpdate._id, this.election.value, pos)
        .subscribe(
          () => {
            this.errors = "";
            this.info = "Position Successfully Updated";
          },
          (error: HttpErrorResponse) => {
            // tslint:disable-next-line: no-string-literal
            this.info = "";
            this.errors = error.error["error"];
          }
        );
    }
  }

  get title() {
    return this.positionForm.get("title");
  }

  get election() {
    return this.positionForm.get("election");
  }
}
