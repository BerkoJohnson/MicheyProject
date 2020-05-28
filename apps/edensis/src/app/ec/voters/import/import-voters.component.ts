import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { NgxCsvParser } from 'ngx-csv-parser';
import { Store } from '@ngrx/store';
import { getSelectedElectionID } from '../../../store/reducers';
import { addMany } from '../../../store/actions/voter.actions';
import IVoter from '../../../models/voter.model';
// import { NgxCSVParserError } from 'ngx-csv-parser';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'imports-voters',
  templateUrl: './import-voters.component.html',
  styleUrls: ['./import-voters.component.scss']
})
export class ImportVotersComponent implements OnInit {
  imageUrl: any;
  imageError: string;
  csvRecords: IVoter[] = [];
  header = true;
  voters: IVoter[];

  file: File;
  form: FormGroup;
  votersLength: number;
  electionID: string;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private ngxCsvParser: NgxCsvParser,
    private store: Store<any>
  ) {
    this.form = this.fb.group({ file: '', room: '' });
  }

  ngOnInit(): void {
    this.store
      .select(getSelectedElectionID)
      .subscribe(x => (this.electionID = x));
  }

  previewImage(event: Event) {
    const file = event.target['files'][0] as File;
    if (!file) return;

    // Validate file input
    const mimetype = file.type;
    if (mimetype.match(/image\/*/) === null) {
      this.imageError = 'Only images are supported!';
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = e => {
      this.imageUrl = reader.result;
    };
  }

  selectFile(event: Event) {
    this.file = event.target['files'][0] as File;

    this.ngxCsvParser
      .parse(this.file, {
        header: this.header,
        delimiter: ','
      })
      .pipe()
      .subscribe(
        (res: Array<any>) => {
          this.votersLength = res.length;
          this.csvRecords = res;
        },
        error => console.error(error)
      );
  }

  importFile() {
    if (this.form.invalid) return;

    this.voters = this.csvRecords.map(v => {
      return {
        ...v,
        election: this.electionID,
        room: this.form.get('room').value
      };
    });

    this.store.dispatch(
      addMany({
        voters: this.voters,
        election: this.electionID
      })
    );
  }
}
