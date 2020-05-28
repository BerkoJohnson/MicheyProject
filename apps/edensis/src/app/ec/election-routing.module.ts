import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EcComponent } from './ec.component';
import { ElectionsComponent } from './elections/elections.component';
import { ElectionListComponent } from './elections/list/election-list.component';
import { NewElectionComponent } from './elections/new/election-new.component';
import { ViewElectionComponent } from './elections/view/election-view.component';
import { ElectionSelectedGuard } from '../guards/election-selected.guard';
import { EditElectionComponent } from './elections/edit/election-edit.component';
import { NewPositionComponent } from './positions/new/new-position.component';
import { EditPositionComponent } from './positions/edit/edit-position.component';
import { ViewPositionComponent } from './positions/view/view-position.component';
import { NewCandidateComponent } from './candidates/new/new-candidate.component';
import { AddCandidateDeactivateGuard } from '../guards/add-candidate-deactivate.guard';
import { EditCandidateComponent } from './candidates/edit/candidate-edit.component';
import { ViewCandidateComponent } from './candidates/view/candidate-view.compnonent';
import { RemoveCandidateComponent } from './candidates/remove/remove-candidate.component';
import { ImportVotersComponent } from './voters/import/import-voters.component';
import { ListVotersComponent } from './voters/list/list-voters.component';

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
            canActivate: [ElectionSelectedGuard],
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
                path: 'view-position',
                component: ViewPositionComponent
              },
              ///Candidate ROutes
              {
                path: 'add-candidate',
                component: NewCandidateComponent,
                canDeactivate: [AddCandidateDeactivateGuard]
              },
              {
                path: 'edit-candidate',
                component: EditCandidateComponent,
                canDeactivate: [AddCandidateDeactivateGuard]
              },
              {
                path: 'view-candidate',
                component: ViewCandidateComponent
              },
              {
                path: 'remove-candidate',
                component: RemoveCandidateComponent
              },
              { path: 'list-voters', component: ListVotersComponent },
              { path: 'import-voters', component: ImportVotersComponent }
            ]
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElectionRoutingModule {}
