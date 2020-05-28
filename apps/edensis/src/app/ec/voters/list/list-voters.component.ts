import { OnInit, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import IVoter from '../../../models/voter.model';
import { selectVoters, getSelectedElectionID } from '../../../store/reducers';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { loadVoters } from '../../../store/actions/voter.actions';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'list-voters',
  templateUrl: './list-voters.component.html',
  styleUrls: ['./list-voters.component.scss']
})
export class ListVotersComponent implements OnInit {
  voters$: Observable<IVoter[]>;
  electionID: string;
  form: FormGroup;
  titleStr = 'Select All';

  selectedIDs: string[] = [];

  constructor(private store: Store<any>, private fb: FormBuilder) {
    this.form = this.fb.group({
      room: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.store
      .select(getSelectedElectionID)
      .subscribe(x => (this.electionID = x));
  }

  loadVoters() {
    if (this.form.invalid) return;

    this.store.dispatch(
      loadVoters({
        election: this.electionID,
        room: this.room
      })
    );

    /**Delay loading voters for 100ms */
    setTimeout(() => {
      this.voters$ = this.store.select(selectVoters);
    }, 100);
  }

  get room() {
    return this.form.get('room').value;
  }

  /**checkAll Voters */
  checkAll(e: Event) {
    const allChecks = document.querySelectorAll('.chks');
    const target = e.target as HTMLInputElement;

    allChecks.forEach((i: HTMLInputElement) => {
      i.checked = target.checked;
      const idx = this.selectedIDs.findIndex(s => s === i.id);

      if (target.checked) {
        this.titleStr = 'Unselect All';
        if (idx > -1) return;
        else this.selectedIDs.push(i.id);
      } else {
        this.selectedIDs.splice(idx, 1);
        this.titleStr = 'Select All';
      }
    });
  }

  checkThis(e: Event) {
    const target = e.target as HTMLInputElement;
    const idx = this.selectedIDs.findIndex(i => i === target.id);

    if (target.checked && idx < 0) {
      this.selectedIDs.push(target.id);
    } else {
      this.selectedIDs.splice(idx, 1);
    }
    (document.getElementById('checkAll') as HTMLInputElement).checked = false;
  }
}
