import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-list-teams',
  templateUrl: './list-teams.page.html',
  styleUrls: ['./list-teams.page.scss']
})
export class ListTeamsPage implements OnInit {

  teams: any = [];

  constructor(private teamService: TeamService, private router: Router) { }

  ngOnInit() { }

  ionViewDidEnter() {
    this.getAllTeams();
  }

  getAllTeams() {
    this.teamService.getTeams().subscribe(response => {
      this.teams = response;
    });
  }

  deleteTeam(id) {
    this.teamService.deleteTeam(id).subscribe(response => {
      this.getAllTeams();
    })
  }

  updateTeam(team){
    this.router.navigate(['/update-team', team.id]);
  }

  addTeam() {
    this.router.navigateByUrl("/add-team");
  }
}