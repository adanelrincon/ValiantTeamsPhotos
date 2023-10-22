import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TeamService } from '../services/team.service';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.page.html',
  styleUrls: ['./add-team.page.scss'],
})
export class AddTeamPage implements OnInit {

  teamForm: FormGroup;
  isSubmitted: boolean = false;
  capturedPhoto: string = "";

  constructor(public formBuilder: FormBuilder,
    private teamService: TeamService,
    private photoService: PhotoService,
    private router: Router
  ) { }

  ionViewWillEnter() {
    this.teamForm.reset();
    this.isSubmitted = false;
    this.capturedPhoto = "";
  }

  ngOnInit() {
    this.teamForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      region: ['', [Validators.required]]
    })
  }
  get errorControl() {
    return this.teamForm.controls;
  }

  takePhoto() {
    this.photoService.takePhoto().then(data => {
      this.capturedPhoto = data.webPath;
    });
  }

  pickImage() {
    this.photoService.pickImage().then(data => {
      this.capturedPhoto = data.webPath;
    });
  }

  discardImage() {
    this.capturedPhoto = null;
  }

  async submitForm() {
    this.isSubmitted = true;
    if (!this.teamForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      let blob = null;
      if (this.capturedPhoto != "") {
        const response = await fetch(this.capturedPhoto);
        blob = await response.blob();
      }

      this.teamService.createTeam(this.teamForm.value, blob).subscribe(data => {
        console.log("Photo sent!");
        this.router.navigateByUrl("/list-teams");
      })
    }
  }
}

