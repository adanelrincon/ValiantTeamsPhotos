import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UpdateTeamPage } from './update-team/update-team.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list-teams',
    pathMatch: 'full'
  },
  {
    path: 'add-team',
    loadChildren: () => import('./add-team/add-team.module').then( m => m.AddTeamPageModule)
  },
  {
    path: 'list-teams',
    loadChildren: () => import('./list-teams/list-teams.module').then( m => m.ListTeamsPageModule)
  },
  {
    path: 'update-team/:id',
    loadChildren: () => import('./update-team/update-team.module').then( m => m.UpdateTeamPageModule)
  },
  {
    path: 'update-team/:id',
    component: UpdateTeamPage,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }