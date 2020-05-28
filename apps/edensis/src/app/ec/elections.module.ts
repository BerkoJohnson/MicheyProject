import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ImportVotersComponent } from './voters/import/import-voters.component';
import { ElectionsComponent } from './elections/elections.component';
import { ElectionListComponent } from './elections/list/election-list.component';
import { NewElectionComponent } from './elections/new/election-new.component';
import { ViewElectionComponent } from './elections/view/election-view.component';
import { EcComponent } from './ec.component';
import { EditElectionComponent } from './elections/edit/election-edit.component';
import { NewPositionComponent } from './positions/new/new-position.component';
import { EditPositionComponent } from './positions/edit/edit-position.component';
import { ViewPositionComponent } from './positions/view/view-position.component';
import { ListPositionsComponent } from './positions/list/list-positions.component';
import { ViewCandidateComponent } from './candidates/view/candidate-view.compnonent';
import { ListCandidateComponent } from './candidates/list/list-candidate.component';
import { NewCandidateComponent } from './candidates/new/new-candidate.component';
import { EditCandidateComponent } from './candidates/edit/candidate-edit.component';
import { ElectionSelectedGuard } from '../guards/election-selected.guard';
import { RemoveCandidateComponent } from './candidates/remove/remove-candidate.component';
import { ElectionRoutingModule } from './election-routing.module';
import { ListVotersComponent } from './voters/list/list-voters.component';

@NgModule({
  declarations: [
    ImportVotersComponent,
    ListVotersComponent,

    ElectionsComponent,
    ElectionListComponent,
    NewElectionComponent,
    ViewElectionComponent,
    EcComponent,
    EditElectionComponent,
    ///Positions
    NewPositionComponent,
    EditPositionComponent,
    ViewPositionComponent,
    ListPositionsComponent,

    /// Candidates
    ViewCandidateComponent,
    ListCandidateComponent,
    NewCandidateComponent,
    EditCandidateComponent,
    RemoveCandidateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ElectionRoutingModule
  ]
})
export class ElectionsModule {}
