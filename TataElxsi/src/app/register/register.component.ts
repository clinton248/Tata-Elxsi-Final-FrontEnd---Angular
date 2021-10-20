import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ConnectionService } from '../services/connection.service';
import { GlobaldataService } from '../services/globaldata.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public status=false;
  public ErrorStatus=false;
  public LoadingSpinner=false;
  public StatusMessage:any;
  public country = new FormControl;
  public cont = new FormControl;
  public lang = new FormControl;
  public userData:any={
    continent:"",
    country:"",
    language:""
  };

  constructor(private router:Router,public connectionService:ConnectionService, private countries: GlobaldataService) { }

  public countriesList:any=[];
  public languagesList:any=[];

  public continents=this.countries.counList;
  ngOnInit(): void {
    this.status=false;
    this.ErrorStatus=false;
    this.LoadingSpinner=false;
  }

  move_to_login(){
    this.router.navigateByUrl('/login');
   
  }
 
  move_to_forgot_password(){
    this.router.navigateByUrl('/forgot-password');
  
  }
  
  onSubmit(signupForm:NgForm){
    console.log("UserData:::",this.userData)
    this.LoadingSpinner=true;
    var username="";
    var email="";
    var password="";
    var continent="";
    var country="";
    var language="";
    var address="";
    var phone="";
    username=signupForm.controls.username.value;
    email=signupForm.controls.email.value;
    password=signupForm.controls.password.value;
    continent=this.userData.continent;
    country=this.userData.country;
    language=this.userData.language;
    address=signupForm.controls.address.value;
    phone=signupForm.controls.phone.value;
   
    this.connectionService
      .register(username, email, password, continent, country, language, address, phone)
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
          this.StatusMessage=error.error.message;
          this.LoadingSpinner=false;
         
        }
    });

 


  }

  onContinentChange(){
    // console.log("countriesList::", this.countriesList)
    this.countriesList=[];
    if(this.userData.continent){
      for(let c of this.countries.continents){
        if(this.userData.continent == c.continent){
          this.countriesList.push(c);
        }
      }
    }
    else{
      this.userData.errors="Please select Continent First.";
    }
    // console.log("countriesList::", this.countriesList)
  }

  onCountryChange(){
    // console.log("onCountryChange", this.languagesList)
    this.languagesList=[];
    if(this.userData.country){
      for(let c of this.countries.continents){
        if(this.userData.country == c.country){
          if(c.lan){
            for(let l of c.lan){
              this.languagesList.push(l);
            }
          }
        }
      }
    }
    else{
      this.userData.errors="Please select Country First.";
    }
    // console.log("languagesList::", this.languagesList)
  }

}
