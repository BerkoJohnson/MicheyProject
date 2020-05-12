import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PositionsComponent } from './positions/positions.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewPositionComponent } from './positions/view/view-position.component';
import { NewPositionComponent } from './positions/new/new-position.component';
import { EditPositionComponent } from './positions/edit/edit-position.component';
import { ListPositionsComponent } from './positions/list/list-positions.component';

const positionRoutes: Routes = [
  {
    path: '',
    component: PositionsComponent,
    children: [
      { path: 'new', component: NewPositionComponent },
      {
        path: '/:id',
        children: [
          { path: 'view', component: ViewPositionComponent },
          { path: 'edit', component: EditPositionComponent }
        ]
      }
    ]
  }
];

@NgModule({
  declarations: [
    PositionsComponent,
    NewPositionComponent,
    EditPositionComponent,
    ViewPositionComponent,
    ListPositionsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(positionRoutes)
  ],
  providers: []
})
export class PositionsModule {}
