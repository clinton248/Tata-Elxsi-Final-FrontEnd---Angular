import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ConnectionService } from 'src/app/services/connection.service';
import {DashboardComponent} from 'src/app/dashboard/dashboard.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  public userdetails: []|any;
  public status=false;
  public ErrorStatus=false;
  public LoadingSpinner=false;
  public StatusMessage:any;
  constructor(public connectionService:ConnectionService, public router:Router, public dashboardcomponent:DashboardComponent) { }

  ngOnInit(): void {
    this.connectionService.getDetails().subscribe(data=>{this.userdetails=[data]; })
   
  }
  callchangepassword(){
    this.dashboardcomponent.changepassword();
  }
  onSubmit(EditForm:NgForm){
    this.LoadingSpinner=true;
    var continent="";
    var country="";
    var language="";
    var address="";
    var phone="";
   
    continent=EditForm.controls.continent.value;
    country=EditForm.controls.country.value;
    language=EditForm.controls.language.value;
    address=EditForm.controls.address.value;
    phone=EditForm.controls.phone.value;
   
    this.connectionService
      .editprofile(continent, country, language, address, phone)
      .pipe(first())
      .subscribe({
        next: data => {
        this.ErrorStatus=false;
          this.status=true;
          this.LoadingSpinner=false;
         
        },
        error: error => {
          this.status=false;
          this.ErrorStatus=true;
          this.StatusMessage=error;
          this.LoadingSpinner=false;
          
         
        }
    });

  



  }

}
