import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListTeamsPage } from './list-teams.page';

const routes: Routes = [
  {
    path: '',
    component: ListTeamsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListTeamsPageRoutingModule {}
