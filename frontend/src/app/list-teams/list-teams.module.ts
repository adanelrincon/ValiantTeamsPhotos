import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListTeamsPageRoutingModule } from './list-teams-routing.module';

import { ListTeamsPage } from './list-teams.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListTeamsPageRoutingModule
  ],
  declarations: [ListTeamsPage]
})
export class ListTeamsPageModule {}
