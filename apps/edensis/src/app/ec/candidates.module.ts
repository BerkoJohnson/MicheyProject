import { NgModule } from '@angular/core';
import { CandidatesComponent } from './candidates/candidates.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ViewCandidateComponent } from './candidates/view/candidate-view.compnonent';
import { ListCandidateComponent } from './candidates/list/list-candidate.component';
import { NewCandidateComponent } from './candidates/new/new-candidate.component';
import { EditCandidateComponent } from './candidates/edit/candidate-edit.component';

const candidatesRoutes: Routes = [
  {
    path: '',
    component: CandidatesComponent,
    children: [
      { path: 'new', component: NewCandidateComponent },
      {
        path: '/:id',
        children: [
          { path: 'view', component: ViewCandidateComponent },
          { path: 'edit', component: EditCandidateComponent }
        ]
      }
    ]
  }
];

@NgModule({
  declarations: [
    CandidatesComponent,
    ViewCandidateComponent,
    ListCandidateComponent,
    NewCandidateComponent,
    EditCandidateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(candidatesRoutes)
  ],
  providers: []
})
export class CandidatesModule {}
