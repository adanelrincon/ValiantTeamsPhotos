import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeamService } from '../services/team.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-update-team',
  templateUrl: './update-team.page.html',
  styleUrls: ['./update-team.page.scss'],
})
export class UpdateTeamPage implements OnInit {

  teamFormUpdate: FormGroup;
  isSubmitted: boolean = false;
  capturedPhoto: string = "";
  teamId: number;
  teamToUpdate: any;
  teamPhoto: any;

  constructor(public fb: FormBuilder,
    private teamService: TeamService,
    private photoService: PhotoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ionViewWillEnter() {
    this.teamFormUpdate.reset();
    this.isSubmitted = false;
    this.capturedPhoto = "";
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.teamId = id;
      this.teamService.getOneTeam(id).subscribe((team: any) => {
        this.teamPhoto = team.filename;
        this.teamToUpdate = team;
        this.teamFormUpdate.setValue({
          name: team.name,
          region: team.region,
        })
      })
    });

    this.teamFormUpdate = this.fb.group({
      name: ['', [Validators.required]],
      region: ['', [Validators.required]]
    });
  }

  goToTeams() {
    this.router.navigateByUrl("/list-teams");
  }

  get errorControl() {
    return this.teamFormUpdate.controls;
  }

  takePhoto() {
    this.photoService.takePhoto().then(data => {
      this.capturedPhoto = data.webPath;
      if (this.capturedPhoto !== this.teamPhoto) {
        this.teamPhoto = this.capturedPhoto;
      }
    });
  }

  pickImage() {
    this.photoService.pickImage().then(data => {
      this.capturedPhoto = data.webPath;
      if (this.capturedPhoto !== this.teamPhoto) {
        this.teamPhoto = this.capturedPhoto;
      }
    });
  }


  discardImage() {
    this.capturedPhoto = null;
  }

  async submitForm() {
    this.isSubmitted = true;
    console.log('Team Photo:', this.teamPhoto);
    if (!this.teamFormUpdate.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      let blob: Blob | null = null;
      
      if (this.teamPhoto) {
        try {
          const response = await fetch(this.teamPhoto);
          blob = await response.blob();
        } catch (error) {
          console.error('Error creating Blob:', error);
        }
      }
      
      this.updateTeam();

      /*this.teamService.update(this.teamId, this.teamToUpdate, blob).subscribe(data => {
        console.log("Team updated!");
        this.router.navigateByUrl("/list-teams");
      });*/
    }
  } 

  updateTeam() {
    if (this.teamFormUpdate.valid && this.teamToUpdate) {
      const { name, region, id } = this.teamToUpdate;
      const updatedTeam = {
        name: this.teamFormUpdate.value.name, 
        region: this.teamFormUpdate.value.region, 
        //file: this.teamPhoto
      };
      const bolb = this.teamPhoto;
      this.teamService.update(id, updatedTeam, bolb).subscribe(response => {
        this.teamToUpdate = null;
        this.goToTeams();
      });
    }
  }
  
}

