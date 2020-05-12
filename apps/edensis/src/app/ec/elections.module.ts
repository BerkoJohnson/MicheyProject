import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { VotersComponent } from './voters/voters.component';
import { ElectionsComponent } from './elections/elections.component';
import { ElectionListComponent } from './elections/list/election-list.component';
import { NewElectionComponent } from './elections/new/election-new.component';
import { ViewElectionComponent } from './elections/view/election-view.component';
import * as fromElection from './store/election.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ElectionEffects } from './store/election.effects';
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

const votersRoutes: Routes = [
  { path: '', component: VotersComponent, children: [] }
];

const routes: Routes = [
  {
    path: '',
    component: EcComponent,
    children: [
      {
        path: 'elections',
        component: ElectionsComponent,
        children: [
          { path: '', component: ElectionListComponent },
          { path: 'new', component: NewElectionComponent },
          {
            path: ':id',
            component: ViewElectionComponent,
            children: [
              { path: 'edit-election', component: EditElectionComponent },
              ///Positions ROutes
              {
                path: 'add-position',
                component: NewPositionComponent
              },
              {
                path: 'edit-position/:pid',
                component: EditPositionComponent
              },
              {
                path: 'view-position/:pid',
                component: ViewPositionComponent
              },
              ///Candidate ROutes
              {
                path: 'add-candidate',
                component: NewCandidateComponent
              },
              {
                path: 'edit-candidate/:cid',
                component: EditCandidateComponent
              },
              {
                path: 'view-candidate/:cid',
                component: ViewCandidateComponent
              },

              { path: 'voters', children: votersRoutes }
            ]
          }
        ]
      }
    ]
  }
];

@NgModule({
  declarations: [
    VotersComponent,
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
    EditCandidateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(
      fromElection.electionsFeatureKey,
      fromElection.reducer
    ),
    EffectsModule.forFeature([ElectionEffects])
  ],
  exports: [RouterModule]
})
export class ElectionsModule {}
