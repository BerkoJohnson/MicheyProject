import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Election } from '../../interfaces';
import { ElectionService } from '../../services/election.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-elections',
  templateUrl: './elections.component.html',
  styleUrls: ['./elections.component.scss']
})
export class ElectionsComponent implements OnInit {
  elections: Election[];

  electionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public electionSrv: ElectionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.electionForm = this.fb.group({
      title: ['', Validators.required],
      school: ['', Validators.required],
      academicYear: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.electionSrv
      .getElections()
      .subscribe(elecs => (this.elections = elecs));
  }

  useElection(election: Election) {
    this.electionSrv.setElection(election);
    const returnUrl = this.route.snapshot.queryParams['returnUrl'];
    if (returnUrl === null || returnUrl === undefined) return;
    this.router.navigate([returnUrl], { relativeTo: this.route });
  }

  submitForm() {
    if (this.electionForm.invalid) {
      return;
    }

    const elec: Election = {
      title: this.title.value,
      school: this.school.value,
      academicYear: this.academicYear.value
    };

    this.electionSrv.createElection(elec).subscribe();
  }

  get title() {
    return this.electionForm.get('title');
  }

  get school() {
    return this.electionForm.get('school');
  }
  get academicYear() {
    return this.electionForm.get('academicYear');
  }
}
