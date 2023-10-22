import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  endPoint = "http://localhost:8080/api/teams";

  constructor(private httpClient: HttpClient) { }

  getTeams(){
    return this.httpClient.get(this.endPoint);
  }

  //Observable<any>
  getOneTeam(teamId: number){
      const findOneEndpoint = `${this.endPoint}/${teamId}`;
      return this.httpClient.get(findOneEndpoint);
  }

  createTeam(team, blob){
    let formData = new FormData();
    formData.append("name", team.name);
    formData.append("region", team.region);
    formData.append("file", blob);
    return this.httpClient.post(this.endPoint, formData);
  }

  deleteTeam(teamId: number) {
    const deleteEndpoint = `${this.endPoint}/${teamId}`;
    return this.httpClient.delete(deleteEndpoint);
  }

  updateTeam(team: any, updatedBlob: Blob) {
    const updateEndpoint = `${this.endPoint}/${team.id}`;
    const formData = new FormData();
    formData.append("name", team.name);
    formData.append("region", team.region);
    formData.append("file", updatedBlob);
    return this.httpClient.put(updateEndpoint, formData);
  }

  update(id: number, updatedTeam: any, blob) {
    const formData = new URLSearchParams();
    formData.append("name", updatedTeam.name);
    formData.append("region", updatedTeam.region);
    formData.append("flie", blob);
    return this.httpClient.put(`${this.endPoint}/${id}`, formData.toString());
  }
}